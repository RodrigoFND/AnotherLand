import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Props } from '../../model/root/root-model'
import { toastMessage } from '../../shared/components/toast/toast.component'
import useRolePermission from '../../shared/hooks/use-role-permission'
import { useAppSelector } from '../../store/hooks'

const ProtectedRoute = (props: Props) => {
  const authState = useAppSelector((state) => state.auth)
  const waitingForTokenCheck = authState.token && !authState.user
  const rolesPermission = useRolePermission()
  useEffect(() => {
    // await
  }, [])

  if (waitingForTokenCheck) {
    return <></>
  }
  const isUserLoggedIn = authState.token && authState.user
  if (isUserLoggedIn && !rolesPermission(props.ERole)) {
    toastMessage.toastError("User doesn't have permission to access")
    return <Navigate to="../" />
  }
  return isUserLoggedIn ? props.children : <Navigate to="/login" />
}

export default ProtectedRoute
