import Header from './header/header.component'
import Sidebar from './sidebar/sidebar.component'
import './main-template.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import Content from './content/content'

function MainTemplate() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <>
      <aside
        className={`al-side-bar 
      ${isSideBarOpen ? 'al-sidebar-small-window-open' : ''}`}
      >
        <Sidebar toogleSidebar={setIsSideBarOpen} />
      </aside>
      <Container fluid className="al-main-template-container">
        <Row>
          <Col sm={12} style={{ padding: 0 }}>
            <Header toogleSidebar={setIsSideBarOpen} />
          </Col>
          <Col sm={12} style={{ padding: 0 }}>
            <Content />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MainTemplate
