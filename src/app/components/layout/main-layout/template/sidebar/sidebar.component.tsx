// import React from 'react'
// import { AiOutlineClose } from 'react-icons/ai';
// import {
//   Button, Container, Row, Col,
// } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import { AuthAction } from '../../../../../store/auth-state/auth.reducer'
// import { useAppDispatch } from '../../../../../store/hooks'
// import {
//   MenuTree,
//   MenuTreeType,
// } from '../../../../../utils/menu-tree/menu-tree'

import { useEffect, useState } from 'react'
import { Props } from '../../../../../model/root/root-model'

class SidebarProps extends Props {
  toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: SidebarProps) {
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  // const dispatch = useAppDispatch()
  // const logout = () => {
  //   dispatch(AuthAction.logout())
  // }

  useEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  function updateSize() {
    if (window.innerWidth < 760) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }
  // const sidebarRootChildren = (
  //   menuTree: MenuTreeType[],
  //   path: string
  // ): JSX.Element[] => {
  //   return menuTree.map((menu) => {
  //     const treePath = path + menu.path
  //     if (menu.isTree) {
  //       return (
  //         <div key={treePath}>
  //           <h1>{menu.description} </h1>
  //           <ul>{sidebarRootChildren(menu.children, treePath)}</ul>
  //         </div>
  //       )
  //     } else {
  //       return (
  //         <li key={treePath}>
  //           {<Link to={treePath}>{menu.description}</Link>}
  //         </li>
  //       )
  //     }
  //   })
  // }

  // const sideBarMenuRoot = (): JSX.Element[] => {
  //   return MenuTree.map((menu) => {
  //     return (
  //       <div key={menu.path}>
  //         <h1>{menu.description} </h1>
  //         <ul>{sidebarRootChildren(menu.children, menu.path)}</ul>
  //       </div>
  //     )
  //   })
  // }
  return (
    <>
      {isSmallWindow && (
        <Button
          onClick={() => props.toogleSidebar((value) => (value = !value))}
        >
          {' '}
          Close Window
        </Button>
      )}
    </>
    // <div>
    //   {sideBarMenuRoot()}
    //   <h1>Cadastro</h1>
    //   <ul>
    //     <li>
    //       <Link to="/register/registeremployee">Register employee</Link>
    //     </li>
    //     <li>
    //       <Link to="/register/registertask">Register Task</Link>
    //     </li>
    //     <li>
    //       <Link to="/register/registermultipletest/test1">Test1</Link>
    //     </li>
    //     <li>
    //       <Link to="/login">Login</Link>
    //     </li>

    //     <Button onClick={() => logout()}>Logout</Button>
    //   </ul>
    // </div>
  )
}

export default Sidebar
