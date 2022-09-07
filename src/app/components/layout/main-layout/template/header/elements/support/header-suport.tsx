import { Button, Col, Container, Row } from 'react-bootstrap'
import { Props } from '../../../../../../../model/root/root-model'
import ModalComponent from '../../../../../../../shared/components/modal/modal.component'

interface RegisterRolePermissionAddProps extends Props {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function HeaderSupportComponent(props: RegisterRolePermissionAddProps) {
  const { isModalOpen, setIsModalOpen } = props

  return (
    <>
      <ModalComponent
        isModalOpen={isModalOpen}
        onCloseClick={() => setIsModalOpen(false)}
      >
        <div className="al-modal-header p-3">Support contact</div>

        <div className="al-modal-body">
          <form>
            <Container fluid className="al-form py-4 m-0">
              <Row className="al-form-group">
                <Col sm={12} lg={12}>
                  <span className="d-block">
                    Email: rodrigofnaves@hotmail.com
                  </span>
                  <span className="d-block">
                    Cell phone: +55 (62) 98574-3987
                  </span>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
        <div className="al-modal-footer p-3">
          <Button
            className=" ms-2 al-btn-md al-btn-transparent"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </div>
      </ModalComponent>
    </>
  )
}

export default HeaderSupportComponent
