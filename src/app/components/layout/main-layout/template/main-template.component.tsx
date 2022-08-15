import Header from './header/header.component'
import Sidebar from './sidebar/sidebar.component'
import './main-template.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

function MainTemplate() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={12} style={{ padding: 0 }}>
            <Header toogleSidebar={setIsSideBarOpen} />
          </Col>
          <Col sm={12} style={{ padding: 0 }}></Col>
        </Row>
      </Container>
      <aside
        className={`al-side-bar 
      ${isSideBarOpen ? 'al-sidebar-small-window-open' : ''}`}
      >
        <Sidebar toogleSidebar={setIsSideBarOpen} />
      </aside>
    </>
  )
}

export default MainTemplate
