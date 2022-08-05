import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'

function PagesLayout() {
  const authState = useAppSelector((state) => state.auth)
  const waitingForTokenCheck = authState.token && !authState.user

  if (waitingForTokenCheck) {
    return <></>
  }
  return <>{authState.user ? <Navigate to="/" /> : <Outlet />}</>
}

export default PagesLayout
