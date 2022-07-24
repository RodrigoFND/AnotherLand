import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element // 👈️ type children
}

const PrivateRoute = (props: Props) => {
  const auth = { token: true }

  return auth.token ? props.children : <Navigate to="/login" />
}

export default PrivateRoute
