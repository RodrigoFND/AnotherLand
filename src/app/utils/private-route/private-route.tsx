import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

type Props = {
  children: JSX.Element // 👈️ type children
}

const PrivateRoute = (props: Props) => {
  const userLogged = useAppSelector((state) => state.user.isAuthenticated)

  const isRouteAuthorized = userLogged

  return isRouteAuthorized ? props.children : <Navigate to="/login" />
}

export default PrivateRoute
