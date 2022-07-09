import { useRoutes } from 'react-router-dom'
import MainTemplate from './app/components/pages/main/template/main-template.component'
import Cadastro from './app/components/pages/main/view/cadastro/cadastro.component'

function AppRouter() {
  return useRoutes([
    {
      path: '/',
      element: <MainTemplate />,
      children: [
        {
          path: 'cadastro/*',
          element: <Cadastro />,
        },
      ],
    },
  ])
}

export default AppRouter
