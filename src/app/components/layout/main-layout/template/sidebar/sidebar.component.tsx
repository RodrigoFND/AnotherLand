import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AuthAction } from '../../../../../store/auth-state/auth.reducer'
import { useAppDispatch } from '../../../../../store/hooks'
import {
  MenuTree,
  MenuTreeType,
} from '../../../../../utils/menu-tree/menu-tree'

import { Props } from '../../../../../model/root/root-model'
import { Button } from 'react-bootstrap'

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
          <div key={treePath}>
            <h1>{menu.description} </h1>
            <ul>{sidebarRootChildren(menu.children, treePath)}</ul>
          </div>
        )
      } else {
        return (
          <li key={treePath}>
            {<Link to={treePath}>{menu.description}</Link>}
          </li>
        )
      }
    })
  }

  const sideBarMenuRoot = (): JSX.Element[] => {
    return MenuTree.map((menu) => {
      return (
        <div key={menu.path}>
          <h1>{menu.description} </h1>
          <ul>{sidebarRootChildren(menu.children, menu.path)}</ul>
        </div>
      )
    })
  }
  return (
    <>
      <AiOutlineClose
        className="al-dropdown-sidebar-icon"
        onClick={() => props.toogleSidebar((value) => (value = !value))}
      ></AiOutlineClose>
      <div>
        {sideBarMenuRoot()}
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
          <Button onClick={() => logout()}>Logout</Button>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
