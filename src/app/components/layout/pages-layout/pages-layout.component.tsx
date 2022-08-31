import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'

function PagesLayout() {
  const authState = useAppSelector((state) => state.auth)
  const location = useLocation()
  const isUserTimeExpired = () => {
    return authState.isAuthenticated == false && authState.user
  }

  if (authState.isAuthenticated == null) {
    return <></>
  }

  if (authState.isAuthenticated) {
    return <Navigate to="/" />
  }

  if (isUserTimeExpired() && location.pathname != '/timeexpired') {
    return <Navigate to="/timeexpired" />
  }

  if (
    !authState.isAuthenticated &&
    !isUserTimeExpired() &&
    location.pathname != '/login'
  ) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default PagesLayout
