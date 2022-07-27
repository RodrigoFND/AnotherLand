import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'

function PagesLayout() {
  const userLogged = useAppSelector((state) => state.user.isAuthenticated)
  //
  return <>{userLogged ? <Navigate to="/" /> : <Outlet />}</>
}

export default PagesLayout
