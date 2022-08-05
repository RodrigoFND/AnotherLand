import { ErrorMessage } from '../../model/root/root-model'
import { toastMessage } from '../../shared/components/toast/toast.component'

const reducerErrorToast = (payload: ErrorMessage) => {
  if (payload?.message) {
    toastMessage.toastError(payload.message)
  } else {
    toastMessage.toastError(
      'Server error. Wait a few minutes and try again or contact the support staff.'
    )
  }
}

export default reducerErrorToast
