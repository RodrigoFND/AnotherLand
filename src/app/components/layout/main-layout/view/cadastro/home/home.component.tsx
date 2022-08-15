import { Col, Container, Row, Image } from 'react-bootstrap'
import logo from '../../../../../../assets/img/another-land-logo-with-name.png'
import './home.component.scss'

function HomeComponent() {
  return (
    <Container
      fluid
      className="al-login-view d-flex flex-column align-items-center justify-content-center al-loading-page"
    >
      <Row className="w-100 text-center">
        <Col sm={12}>
          <Image className="al-home-logo" src={logo}></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default HomeComponent
