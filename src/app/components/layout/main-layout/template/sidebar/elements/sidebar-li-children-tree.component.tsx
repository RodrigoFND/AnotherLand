import { useState } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Props } from '../../../../../../model/root/root-model'
import { MenuTreeType } from '../../../../../../utils/menu-tree/menu-tree'

interface LiChildrenProps extends Props {
  menu: MenuTreeType
  path: string
}

const SidebarLIChildrenTree = (
  menuTree: MenuTreeType[],
  path: string
): JSX.Element[] => {
  return menuTree.map((menu, index) => {
    return (
      <SidebarLIChildren key={`children ${index}`} menu={menu} path={path} />
    )
  })
}

const SidebarLIChildren = (props: LiChildrenProps) => {
  const { menu, path } = props
  const treePath = path + menu.path
  const [isOpen, setIsOpen] = useState<boolean>(false)
  if (menu.isTree) {
    return (
      <li className="al-sidebar-li">
        <button
          className="al-dropdown-button"
          onClick={() => setIsOpen((opened) => (opened = !opened))}
        />
        <span className="al-sidebar-text">{menu.description}</span>
        <i className="al-sidebar-arrow ">
          <AiOutlineArrowDown />
        </i>
        <ul className={`al-sidebar-ul ${isOpen && 'al-dropdown-open'}`}>
          {SidebarLIChildrenTree(menu.children, treePath)}
        </ul>
      </li>
    )
  } else {
    return (
      <li className="al-sidebar-li al-sidebar-li-link">
        <Link to={treePath} className="d-block">
          <span className="al-sidebar-text">{menu.description}</span>
        </Link>
      </li>
    )
  }
}

export default SidebarLIChildrenTree
