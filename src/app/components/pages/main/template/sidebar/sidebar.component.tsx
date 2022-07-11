// import React from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
// import {
//   Button, Container, Row, Col,
// } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
      <h1>Cadastro</h1>
      <ul>
        <li>
          <Link to="/register/registeremployee">Cadastro Colaborador</Link>
        </li>
      </ul>
    </div>
    // <Container fluid>
    //   <Row>
    //     <Col className="">
    //       <Button onClick={() => props.toogleSidebar()}>
    //         <AiOutlineClose />
    //         {' '}
    //       </Button>
    //     </Col>
    //     <Col>

    //     </Col>
    //   </Row>
    // </Container>
  )
}

export default Sidebar
