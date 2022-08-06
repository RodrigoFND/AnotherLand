import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { EAuthenticationStatus } from '../../../model/auth/auth.models'
import { useAppSelector } from '../../../store/hooks'

function PagesLayout() {
  const authState = useAppSelector((state) => state.auth)
  const [component, setComponent] = useState(null)
  console.log('changes Layout')
  const location = useLocation()

  useEffect(() => {
    const isUserAuthenticated =
      authState.authentication == EAuthenticationStatus.AUTHENTICATED
    const isUserRejected =
      authState.authentication == EAuthenticationStatus.NOTAUTHENTICATED
    if (isUserAuthenticated || isUserRejected) {
      setComponent(<Outlet></Outlet>)
    }
  }, [authState])

  const isUserTimeExpired = (): boolean => {
    const userTimeExpired =
      authState.user &&
      authState.authentication == EAuthenticationStatus.NOTAUTHENTICATED
    return userTimeExpired
  }

  if (authState.authentication == EAuthenticationStatus.AUTHENTICATED) {
    return <Navigate to="/" />
  }

  if (!authState.user && location.pathname != '/login') {
    return <Navigate to="/login" />
  }

  if (isUserTimeExpired() && location.pathname != '/timeexpired') {
    return <Navigate to="/timeexpired" />
  }

  return <>{component ? component : <> </>}</>
}

export default PagesLayout
