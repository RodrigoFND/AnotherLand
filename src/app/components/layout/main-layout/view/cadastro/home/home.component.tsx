import { Col, Container, Row, Image } from 'react-bootstrap'
import logo from '../../../../../../assets/img/al-icon.png'
import './home.component.scss'

function HomeComponent() {
  return (
    <Container fluid className="d-flex text-center align-items-center">
      <Row
        className=" d-flex text-center align-items-center w-100"
        style={{ height: '75vh' }}
      >
        <Col sm={12}>
          <Image className="al-home-logo" src={logo}></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default HomeComponent
