import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Props } from '../../model/root/root-model'
import { useAppSelector } from '../../store/hooks'

const PrivateRoute = (props: Props) => {
  const userLogged = useAppSelector((state) => state.auth.isAuthenticated)
  const isRouteAuthorized = userLogged
  useEffect(() => {
    // await
  }, [])

  return isRouteAuthorized ? props.children : <Navigate to="/login" />
}

export default PrivateRoute
