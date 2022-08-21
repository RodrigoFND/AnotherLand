import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Props } from '../../../model/root/root-model'
import './custom-breadcrumb.component.scss'

function CustomBreadcrumbComponent(props: Props) {
  const tree = props?.tree.replaceAll(' / ', ' > ')
  const children = React.Children.toArray(props.children)
  return (
    <Container fluid className="py-2 al-bread-crumb-container">
      <Row>
        <Col sm={12} className="pt-3 d-flex  justify-items-center">
          <div>
            <h1>{tree}</h1>
          </div>
        </Col>
        <Col className="pt-3 d-flex  justify-items-start">
          <div>
            <h2>{props.header}</h2>
          </div>
        </Col>
        <Col md={6} className=" al-breadcrumb-buttons-container">
          {children.map((children, index) => {
            return (
              <div className="al-breadcrumb-buttons" key={index}>
                {' '}
                {children}
              </div>
            )
          })}
        </Col>
      </Row>
    </Container>
  )
}

export default CustomBreadcrumbComponent
