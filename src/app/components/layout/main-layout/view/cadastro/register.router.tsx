import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

const RegisterEmployeeRouter = React.lazy(
  () => import('./register-employee/register-employee.router')
)

const RegisterTest1Router = React.lazy(
  () =>
    import('./register-multiple-test/register-test-1/register-test-1-router')
)

const RegisterTaskRouter = React.lazy(
  () => import('./register-task/register-task-router')
)

function RegisterRouter() {
  const element = useRoutes([
    {
      path: '/*',
      element: <Outlet />,
      children: [
        {
          path: 'registeremployee/*',
          element: (
            <React.Suspense fallback={<>...</>}>
              <RegisterEmployeeRouter />
            </React.Suspense>
          ),
        },
        {
          path: 'registertask/*',
          element: (
            <React.Suspense fallback={<>...</>}>
              <RegisterTaskRouter />
            </React.Suspense>
          ),
        },
        {
          path: 'registermultipletest',
          children: [
            {
              path: 'test1/*',
              element: (
                <React.Suspense fallback={<>...</>}>
                  <RegisterTest1Router />
                </React.Suspense>
              ),
            },
          ],
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
