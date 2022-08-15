import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { Props } from '../../../../../model/root/root-model'

class HeaderProps extends Props {
  toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  return (
    <Container fluid className="al-header-container border-bottom p-3">
      <Row>
        <Col sm={3}>
          <FaBars
            className="al-dropdown-sidebar-icon"
            size={56}
            onClick={() => props.toogleSidebar((value) => (value = !value))}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Header
