import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainTemplate from './app/components/pages/main/template/main-template.component'

const RegisterRouter = React.lazy(
  () => import('./app/components/pages/main/view/cadastro/register.router')
)

function AppRouter() {
  return useRoutes([
    {
      path: '/',
      element: <MainTemplate />,
      children: [
        {
          path: 'register/*',
          element: (
            <React.Suspense fallback={<>...</>}>
              <RegisterRouter />
            </React.Suspense>
          ),
        },
      ],
    },
  ])
}

export default AppRouter
