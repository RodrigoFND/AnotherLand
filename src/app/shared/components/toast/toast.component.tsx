import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function toastSuccess(message: string) {
  toast.success(message || '', { autoClose: 5000 })
}

export function toastInfo(message: string) {
  toast.info(message || '', { autoClose: 5000 })
}

export function toastWarning(message: string) {
  toast.warning(message || '', { autoClose: 5000 })
}

export function toastError(message: string) {
  toast.error(message || '', { autoClose: 5000 })
}

const ToastComponent = () => {
  return (
    <div className="">
      <ToastContainer />
    </div>
  )
}

export const toastMessage = {
  toastSuccess,
  toastInfo,
  toastWarning,
  toastError,
}

export default ToastComponent
