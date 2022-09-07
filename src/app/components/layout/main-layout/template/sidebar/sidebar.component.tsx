import './sidebar.component.scss'
import { Col, Container, Row, Image } from 'react-bootstrap'
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { Props } from '../../../../../model/root/root-model'
import { AuthAction } from '../../../../../store/auth-state/auth.reducer'
import { useAppDispatch } from '../../../../../store/hooks'
import logo from '../../../../../assets/img/al-icon.png'
import SidebarULRootTree from './elements/sidebar-ul-root-tree.component'

class SidebarProps extends Props {
  toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: SidebarProps) {
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(AuthAction.logout())
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
            {SidebarULRootTree()}
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
