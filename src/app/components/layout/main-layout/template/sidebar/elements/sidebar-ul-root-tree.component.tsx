import { useState } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Props } from '../../../../../../model/root/root-model'
import {
  Menu,
  MenuTree,
  MenuTreeType,
} from '../../../../../../utils/menu-tree/menu-tree'
import SidebarLIChildrenTree from './sidebar-li-children-tree.component'

interface UlProps extends Props {
  menu: MenuTreeType
}

const SidebarULRoot = (props: UlProps) => {
  const { menu } = props
  const menuName = menu.description.toLowerCase()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <ul className={`al-sidebar-ul ${isOpen && 'al-dropdown-open'}`}>
      {menu.isTree && (
        <li className="al-sidebar-li">
          <button
            className="al-dropdown-button"
            onClick={() => setIsOpen((opened) => (opened = !opened))}
          />
          <i className="al-sibebar-icon">
            {Menu[menuName]?.icon({ size: 33 })}
          </i>
          <span className="al-sidebar-text">{menu.description}</span>
          <i className="al-sidebar-arrow">
            <AiOutlineArrowDown></AiOutlineArrowDown>
          </i>
          <ul className={`al-sidebar-ul ${isOpen && 'al-dropdown-open'}`}>
            {SidebarLIChildrenTree(menu.children, menu.path)}
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
}

const SidebarULRootTree = (): JSX.Element[] => {
  return MenuTree.map((menu, index) => {
    return <SidebarULRoot key={`root ${index}`} menu={menu} />
  })
}

export default SidebarULRootTree
