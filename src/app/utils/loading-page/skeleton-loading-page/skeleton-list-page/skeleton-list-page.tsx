import Skeleton from '@mui/material/Skeleton/Skeleton'
import { Col, Container, Row } from 'react-bootstrap'
import './skeleton-list-page.scss'

function SkeletonListPage() {
  return (
    <>
      <Container fluid className="py-2 al-bread-crumb-container">
        <Row>
          <Col sm={12} className=" d-flex  justify-items-center">
            <div>
              <Skeleton width={284} height={48} />
            </div>
          </Col>
          <Col className="pt-2 d-flex  justify-items-start">
            <div>
              <Skeleton width={284} height={48} />
            </div>
          </Col>
          <Col md={6} className=" " style={{ display: 'flex' }}>
            <div style={{ marginLeft: 'auto' }}>
              <Skeleton
                sx={{ borderRadius: '10px' }}
                variant="rounded"
                height={48}
                width={160}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="al-form p-4">
        <Row>
          <Col sm={8} lg={5} xl={3} className="mb-3">
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rounded"
              height={48}
            />
          </Col>
        </Row>
        <Row className="mt-2 al-skeleton-list-height d-block">
          <Col className="mb-3" sm={12}>
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rounded"
              height={48}
            />
          </Col>
          <Col className="mb-3" sm={12}>
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rounded"
              height={48}
            />
          </Col>

          <Col className="mb-3" sm={12}>
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rounded"
              height={48}
            />
          </Col>

          <Col className="mb-3" sm={12}>
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rounded"
              height={48}
            />
          </Col>
          {/* <Col className="mb-3" sm={12}>
             
                <Skeleton variant="rounded" height={48} />
               
                </Col>
                <Col className="mb-3" sm={12}>
             
                <Skeleton variant="rounded" height={48} />
               
                </Col>
                <Col className="mb-3" sm={12}>
             
                <Skeleton variant="rounded" height={48} />
               
                </Col> */}
        </Row>
      </Container>
    </>
  )
}

export default SkeletonListPage
