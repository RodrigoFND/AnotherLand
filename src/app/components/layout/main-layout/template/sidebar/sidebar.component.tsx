// import React from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
// import {
//   Button, Container, Row, Col,
// } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userAction } from '../../../../../store/auth-state/user.reducer'
import { useAppDispatch } from '../../../../../store/hooks'

function Sidebar() {
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(userAction.logout())
  }
  return (
    <div>
      <h1>Cadastro</h1>
      <ul>
        <li>
          <Link to="/register/registeremployee">Register employee</Link>
        </li>
        <li>
          <Link to="/register/registertask">Register Task</Link>
        </li>
        <li>
          <Link to="/register/registermultipletest/test1">Test1</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>

        <Button onClick={() => logout()}>Logout</Button>
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
