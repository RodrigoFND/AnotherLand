import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainTemplate from './app/components/layout/main-layout/template/main-template.component'
import PagesLayout from './app/components/layout/pages-layout/pages-layout.component'
import LoginComponent from './app/components/pages/login/login.component'
import PrivateRoute from './app/utils/private-route'

const RegisterRouter = React.lazy(
  () =>
    import('./app/components/layout/main-layout/view/cadastro/register.router')
)

function AppRouter() {
  return useRoutes([
    {
      path: '',
      element: (
        <PrivateRoute>
          <MainTemplate />
        </PrivateRoute>
      ),
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
    {
      path: '',
      element: <PagesLayout />,
      children: [
        {
          path: 'login',
          element: <LoginComponent />,
        },
      ],
    },
  ])
}

export default AppRouter
