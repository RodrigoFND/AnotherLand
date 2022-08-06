import { Navigate } from 'react-router-dom'
import { EAuthenticationStatus } from '../../model/auth/auth.models'
import { Props } from '../../model/root/root-model'
import { toastMessage } from '../../shared/components/toast/toast.component'
import useRolePermission from '../../shared/hooks/use-role-permission'
import { useAppSelector } from '../../store/hooks'

const ProtectedRoute = (props: Props) => {
  const authState = useAppSelector((state) => state.auth)
  const checkRolesPermission = useRolePermission()
  console.log('changes Protected')

  const waitingForPermission = (): boolean => {
    return (
      authState.authentication == EAuthenticationStatus.VERIFYING &&
      !authState.user
    )
  }

  const isUserLoggedIn = (): boolean => {
    const userLogged =
      authState.user != null &&
      (authState.authentication == EAuthenticationStatus.AUTHENTICATED ||
        authState.previousAuthentication == EAuthenticationStatus.AUTHENTICATED)
    return userLogged
  }

  const isUserTimeExpired = (): boolean => {
    const userTimeExpired =
      authState.user &&
      authState.authentication == EAuthenticationStatus.NOTAUTHENTICATED
    return userTimeExpired
  }

  if (isUserTimeExpired()) {
    return <Navigate to="/timeexpired" />
  }

  if (waitingForPermission()) {
    return <></>
  }

  if (isUserLoggedIn() && !checkRolesPermission(props.ERole)) {
    toastMessage.toastError("User doesn't have permission to access")
    return <Navigate to="../" />
  }

  return isUserLoggedIn() ? props.children : <Navigate to="/login" />
  return <></>
}

export default ProtectedRoute
