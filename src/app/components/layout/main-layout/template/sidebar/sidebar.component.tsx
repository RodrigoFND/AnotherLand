import './sidebar.component.scss'
import { Col, Container, Row, Image } from 'react-bootstrap'
import {
  AiOutlineArrowDown,
  AiOutlineClose,
  AiOutlineLogout,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Props } from '../../../../../model/root/root-model'
import { AuthAction } from '../../../../../store/auth-state/auth.reducer'
import { useAppDispatch } from '../../../../../store/hooks'
import {
  Menu,
  MenuTree,
  MenuTreeType,
} from '../../../../../utils/menu-tree/menu-tree'
import logo from '../../../../../assets/img/al-icon.png'

class SidebarProps extends Props {
  toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: SidebarProps) {
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(AuthAction.logout())
  }

  const sidebarRootChildren = (
    menuTree: MenuTreeType[],
    path: string
  ): JSX.Element[] => {
    return menuTree.map((menu) => {
      const treePath = path + menu.path
      if (menu.isTree) {
        return (
          <>
            <li key={treePath} className="al-sidebar-li">
              <span className="al-sidebar-text">{menu.description}</span>
              <i className="al-sidebar-arrow ">
                <AiOutlineArrowDown />
              </i>
              <ul className="al-sidebar-ul ">
                {sidebarRootChildren(menu.children, treePath)}
              </ul>
            </li>
          </>
        )
      } else {
        return (
          <>
            <li key={treePath} className="al-sidebar-li al-sidebar-li-link">
              <Link to={treePath} className="d-block">
                <span className="al-sidebar-text">{menu.description}</span>
              </Link>
            </li>
          </>
        )
      }
    })
  }

  const sideBarMenuRoot = (): JSX.Element[] => {
    return MenuTree.map((menu, index) => {
      const menuName = menu.description.toLowerCase()

      return (
        <ul key={index} className="al-sidebar-ul ">
          {menu.isTree && (
            <li className="  al-sidebar-li">
              <i className="al-sibebar-icon">
                {Menu[menuName]?.icon({ size: 33 })}
              </i>
              <span className="al-sidebar-text">{menu.description}</span>
              <i className="al-sidebar-arrow">
                <AiOutlineArrowDown></AiOutlineArrowDown>
              </i>
              <ul className="al-sidebar-ul ">
                {sidebarRootChildren(menu.children, menu.path)}
              </ul>
            </li>
          )}

          {!menu.isTree && (
            <li className="al-sidebar-li mt-1 mb-2 al-sidebar-li-link">
              <Link to={menu.path} className="d-block">
                <i>{Menu[menuName]?.icon({ size: 33 })}</i>
                <span className="al-sidebar-text">{menu.description}</span>
              </Link>
            </li>
          )}
        </ul>
      )
    })
  }
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="al-sidebar-logo-container">
            <div className="teste">
              <Image className="al-sidebar-logo" src={logo}></Image>
            </div>
            <AiOutlineClose
              className="al-sidebar-close-icon"
              onClick={() => props.toogleSidebar((value) => (value = !value))}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="mt-2">
            {sideBarMenuRoot()}
          </Col>
          <Col sm={12}>
            <ul className="al-sidebar-ul mt-1">
              <li className="al-sidebar-li al-sidebar-li-link">
                <button onClick={() => logout()}>
                  <i>{<AiOutlineLogout size={33} />}</i>
                  <span className="al-sidebar-text">Logout</span>
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Sidebar
