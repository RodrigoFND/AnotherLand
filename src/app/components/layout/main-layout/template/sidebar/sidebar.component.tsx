import { AiOutlineArrowDown } from 'react-icons/ai'

import { Link } from 'react-router-dom'
// import { useAppDispatch } from '../../../../../store/hooks'
import {
  Menu,
  MenuTree,
  MenuTreeType,
} from '../../../../../utils/menu-tree/menu-tree'

// class SidebarProps extends Props {
//   toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
// }

function Sidebar() {
  // const dispatch = useAppDispatch()
  // const logout = () => {
  //   dispatch(AuthAction.logout())
  // }

  const sidebarRootChildren = (
    menuTree: MenuTreeType[],
    path: string
  ): JSX.Element[] => {
    return menuTree.map((menu) => {
      const treePath = path + menu.path
      // const hasNextMenu = menuTree.indexOf(index,1)
      if (menu.isTree) {
        return (
          <>
            <li key={treePath}>
              {/* <a>{menu.description}</a>
              <a>
                <AiOutlineArrowDown />
              </a> */}
              <ul>{sidebarRootChildren(menu.children, treePath)}</ul>
            </li>
          </>
        )
      } else {
        return (
          <>
            <li key={treePath}>
              <Link to={treePath}>{menu.description}</Link>
            </li>
          </>
        )
      }
    })
  }

  const sideBarMenuRoot = (): JSX.Element[] => {
    return MenuTree.map((menu) => {
      const menuName = menu.description.toLowerCase()

      return (
        <ul key="">
          {menu.isTree && (
            <li key="">
              <i>{Menu[menuName]?.icon({ size: 33 })}</i>
              {/* <a>{menu.description}</a> */}
              <i>
                <AiOutlineArrowDown></AiOutlineArrowDown>
              </i>
              <ul>{sidebarRootChildren(menu.children, menu.path)}</ul>
            </li>
          )}

          {!menu.isTree && (
            <li>
              <i>{Menu[menuName]?.icon({ size: 33 })}</i>
              {<Link to={menu.path}>{menu.description}</Link>}
              {/* <a>
                <AiOutlineArrowDown></AiOutlineArrowDown>
              </a> */}
            </li>
          )}
        </ul>
      )
    })
  }
  return (
    <>
      {sideBarMenuRoot()}
      {/* <Container>
      <Row>
        <Col>
          <AiOutlineClose
          className="al-dropdown-sidebar-icon"
          onClick={() => props.toogleSidebar((value) => (value = !value))}
        />
      </Col>
      </Row>
      <Row>
        <Col sm={12}>
        
        </Col>
        <Col sm={12}>
        <div className="d-flex al-logout-container" onClick={() => logout()}>
          <div > <AiOutlineLogout size={33}/> </div>
          <div className="ms-2 align-self-center">Logout</div>
        </div>
        </Col>
      </Row>
    </Container> */}

      {/* <div>
       
        <h1>Cadastro</h1>
        <ul>
          <li>
            <Link to="/register/registeremployee">Register employee</Link>
          </li>
          <li>
            <Link to="/register/registertask">Register Task</Link>
          </li>
          <li>
            <Link to="/register/registermultipletest/test1">Test1</Link>
          </li>
          
        </ul>
      </div> */}
    </>
  )
}

export default Sidebar
