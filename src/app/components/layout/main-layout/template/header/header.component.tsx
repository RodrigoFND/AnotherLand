import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { Props } from '../../../../../model/root/root-model'
import HeaderSupportComponent from './elements/support/header-suport'

class HeaderProps extends Props {
  toogleSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Container fluid className="al-header-container border-bottom p-3">
      <Row>
        <Col sm={3}>
          <FaBars
            className="al-dropdown-sidebar-icon"
            size={45}
            onClick={() => props.toogleSidebar((value) => (value = !value))}
          />
        </Col>

        <Col className=" ms-auto d-flex justify-content-end flex-wrap" col={4}>
          <BiSupport
            className="al-support-icon"
            size={50}
            onClick={() => setIsModalOpen(true)}
          />
          <HeaderSupportComponent
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Header
