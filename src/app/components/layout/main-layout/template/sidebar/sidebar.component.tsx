import './sidebar.component.scss'
import { Col, Container, Row, Image } from 'react-bootstrap'
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { Props } from '../../../../../model/root/root-model'
import { AuthAction } from '../../../../../store/auth-state/auth.reducer'
import { useAppDispatch } from '../../../../../store/hooks'
import logo from '../../../../../assets/img/al-icon.png'
import { MenuTree } from '../../../../../utils/menu-tree/menu-tree'
import { SidebarLIChildren } from './elements/sidebar-li-children-tree.component'

class SidebarProps extends Props {
  toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: SidebarProps) {
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(AuthAction.logout())
  }

  const SidebarMenuTree = (props: Props): JSX.Element => {
    return (
      <ul className="al-sidebar-ul">
        {MenuTree.map((menu, index) => {
          return <SidebarLIChildren key={index} menu={menu} path={''} />
        })}
        {props.children}
      </ul>
    )
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
            <SidebarMenuTree>
              <li className="al-sidebar-li">
                <button onClick={() => logout()}>
                  <i>{<AiOutlineLogout size={33} />}</i>
                  <span className="al-sidebar-text ">Logout</span>
                </button>
              </li>
            </SidebarMenuTree>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Sidebar
