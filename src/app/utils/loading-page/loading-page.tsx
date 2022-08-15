import { Col, Container, Row, Image } from 'react-bootstrap'
import { FadeLoader } from 'react-spinners'
import logo from '../../assets/img/another-land-logo-with-name.png'
import './loading-page.scss'

const LoadingPage = () => {
  return (
    <Container
      fluid
      className="al-login-view d-flex flex-column align-items-center justify-content-center al-loading-page"
    >
      <Row className="w-100 text-center position-relative  ">
        <Col sm={12}>
          <Image src={logo} className="al-loading-page-logo"></Image>
          <div className="al-loading-page-spinner">
            <FadeLoader loading={true} color={'rgba(165, 7, 42)'}></FadeLoader>
          </div>
        </Col>
      </Row>

      {/* <Row className=" w-100 text-center justify-content-center mt-3">
          <Col
            className="al-form-group d-flex justify-content-center"
            sm={8}
          >
            
          </Col>
      
        </Row> */}
    </Container>
  )
}

export default LoadingPage
