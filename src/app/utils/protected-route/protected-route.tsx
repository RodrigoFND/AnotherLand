import { Navigate } from 'react-router-dom'
import { Props } from '../../model/root/root-model'
import { toastMessage } from '../../shared/components/toast/toast.component'
import useRolePermission from '../../shared/hooks/use-role-permission'
import { useAppSelector } from '../../store/hooks'

const ProtectedRoute = (props: Props) => {
  const authState = useAppSelector((state) => state.auth)
  const checkRolesPermission = useRolePermission()
  console.log('changes Protected')

  if (authState.isAuthenticated == null) {
    return <></>
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (authState.isAuthenticated && !checkRolesPermission(props.ERole)) {
    toastMessage.toastError("User doesn't have permission to access")
    return <Navigate to="../" />
  }

  if (authState.isAuthenticated) {
    return props.children
  }

  return props.children
}

export default ProtectedRoute
