import { useRoutes } from 'react-router-dom'
import MainTemplate from './app/components/pages/main/template/main-template.component'
import RegisterRoutingComponent from './app/components/pages/main/view/cadastro/register-routing.component'

function AppRouter() {
  return useRoutes([
    {
      path: '/',
      element: <MainTemplate />,
      children: [
        {
          path: 'register/*',
          element: <RegisterRoutingComponent />,
        },
      ],
    },
  ])
}

export default AppRouter
