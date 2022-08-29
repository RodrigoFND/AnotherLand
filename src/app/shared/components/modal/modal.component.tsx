import { Modal } from '@mui/material'
import './modal.component.scss'

interface MModal {
  isModalOpen: boolean
  onCloseClick: () => void
  children: JSX.Element | JSX.Element[]
  size?: 'lg' | 'md' | 'sm'
}

function ModalComponent(props: MModal) {
  const { isModalOpen, onCloseClick } = props

  const handleClose = () => {
    console.log('handle close')
    if (!onCloseClick) {
      return
    }
    onCloseClick()
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="al-modal-container al-modal-sm">{props.children}</div>
      </Modal>
    </>
  )
}

export default ModalComponent
