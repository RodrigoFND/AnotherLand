import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import SkeletonListPage from '../../../../../utils/loading-page/skeleton-loading-page/skeleton-list-page/skeleton-list-page'

const RegisterEmployeeRouterLazy = React.lazy(
  () => import('./register-employee/register-employee.router')
)

const RegisterRolePermissionLazy = React.lazy(
  () => import('./register-role-permission/register-role-permission.router')
)

const RegisterTest1RouterLazy = React.lazy(
  () =>
    import('./register-multiple-test/register-test-1/register-test-1-router')
)

const RegisterTaskRouterLazy = React.lazy(
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
            <React.Suspense fallback={<SkeletonListPage />}>
              <RegisterEmployeeRouterLazy />
            </React.Suspense>
          ),
        },
        {
          path: 'registerrolepermission/*',
          element: (
            <React.Suspense fallback={<SkeletonListPage />}>
              <RegisterRolePermissionLazy />
            </React.Suspense>
          ),
        },
        {
          path: 'registertask/*',
          element: (
            <React.Suspense fallback={<SkeletonListPage />}>
              <RegisterTaskRouterLazy />
            </React.Suspense>
          ),
        },
        {
          path: 'registermultipletest',
          children: [
            {
              path: 'test1/*',
              element: (
                <React.Suspense fallback={<SkeletonListPage />}>
                  <RegisterTest1RouterLazy />
                </React.Suspense>
              ),
            },
          ],
        },
        {
          path: '*',
          element: <Navigate to="/register/registeremployee" />,
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
