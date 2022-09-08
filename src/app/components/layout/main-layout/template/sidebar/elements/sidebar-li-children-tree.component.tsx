import { useState } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Props } from '../../../../../../model/root/root-model'
import { Menu, MenuTreeType } from '../../../../../../utils/menu-tree/menu-tree'

interface LiChildrenProps extends Props {
  menu: MenuTreeType
  path: string
}

const SidebarLIChildrenTree = (
  menuTree: MenuTreeType[],
  path: string
): JSX.Element[] => {
  return menuTree.map((menu, index) => {
    return <SidebarLIChildren key={index} menu={menu} path={path} />
  })
}

export const SidebarLIChildren = (props: LiChildrenProps) => {
  const { menu, path } = props
  const navigation = useNavigate()
  const treePath = path + menu.path
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menuName = menu.description.toLowerCase()

  if (menu.isTree) {
    return (
      <li className="al-sidebar-li">
        <button onClick={() => setIsOpen((opened) => (opened = !opened))}>
          <i>{Menu[menuName]?.icon({ size: 33 })}</i>
          <span className="al-sidebar-text ">{menu.description}</span>
          <i
            className={`al-sidebar-arrow
                  ${isOpen && 'al-sidebar-arrow-down'}
                  ${!isOpen && 'al-sidebar-arrow-up'}`}
          >
            <AiOutlineArrowDown />
          </i>
        </button>
        <ul
          className={`al-sidebar-ul 
          ${isOpen && ' dropdown-open'}`}
        >
          {SidebarLIChildrenTree(menu.children, treePath)}
        </ul>
      </li>
    )
  } else {
    return (
      <li className="al-sidebar-li">
        <button onClick={() => navigation(treePath)}>
          <span className="al-sidebar-text ">{menu.description}</span>
        </button>
      </li>
    )
  }
}

export default SidebarLIChildrenTree
