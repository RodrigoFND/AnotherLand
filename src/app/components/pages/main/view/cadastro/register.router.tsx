import { useRoutes } from 'react-router-dom'
import RegisterRoutingComponent from './register-routing.component'

function RegisterRouter() {
  const element = useRoutes([
    {
      path: '/',
      element: <RegisterRoutingComponent />,
      children: [
        {
          path: 'registeremployee/*',
        },
        // {
        //   path: '*',
        //   element: <Navigate to="/cadastro/cadastrocolaborador" replace />,
        // },
      ],
    },
  ])
  return element
}

export default RegisterRouter
