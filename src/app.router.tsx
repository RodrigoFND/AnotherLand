import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import MainTemplate from './app/components/layout/main-layout/template/main-template.component'
import HomeComponent from './app/components/layout/main-layout/view/cadastro/home/home.component'
import PagesLayout from './app/components/layout/pages-layout/pages-layout.component'
import ForgotPasswordComponent from './app/components/pages/forgot-password/forgot-password.component'
import LoginComponent from './app/components/pages/login/login.component'
import ResetPasswordComponent from './app/components/pages/reset-password/reset-password.component'
import UserExpiredComponent from './app/components/pages/user-expired/user-expired.component'
import { ERoles } from './app/model/auth/auth.models'
import LoadingPage from './app/utils/loading-page/loading-page'
import SkeletonListPage from './app/utils/loading-page/skeleton-loading-page/skeleton-list-page/skeleton-list-page'
import ProtectedRoute from './app/utils/protected-route/protected-route'

const RegisterRouter = React.lazy(
  () =>
    import('./app/components/layout/main-layout/view/cadastro/register.router')
)

function AppRouter() {
  return useRoutes([
    {
      path: '',
      element: (
        <React.Suspense fallback={<LoadingPage />}>
          <ProtectedRoute eRole={ERoles.READ}>
            <MainTemplate />
          </ProtectedRoute>
        </React.Suspense>
      ),
      children: [
        {
          path: '',
          element: (
            <React.Suspense fallback={<LoadingPage />}>
              <ProtectedRoute eRole={ERoles.READ}>
                <HomeComponent />
              </ProtectedRoute>
            </React.Suspense>
          ),
        },
        {
          path: 'register/*',
          element: (
            <React.Suspense fallback={<SkeletonListPage />}>
              <RegisterRouter />
            </React.Suspense>
          ),
        },
      ],
    },
    {
      path: '',
      element: (
        <React.Suspense fallback={<LoadingPage />}>
          <PagesLayout />
        </React.Suspense>
      ),
      children: [
        {
          path: 'login',
          element: <LoginComponent />,
        },
        {
          path: 'timeexpired',
          element: <UserExpiredComponent />,
        },
      ],
    },
    {
      path: 'forgotpassword',
      element: (
        <React.Suspense fallback={<LoadingPage />}>
          <ForgotPasswordComponent />
        </React.Suspense>
      ),
    },
    {
      path: 'resetpassword/:id',
      element: (
        <React.Suspense fallback={<LoadingPage />}>
          <ResetPasswordComponent />
        </React.Suspense>
      ),
    },

    {
      path: '*',
      element: (
        <React.Suspense fallback={<LoadingPage />}>
          <Navigate to="/" />
        </React.Suspense>
      ),
    },
  ])
}

export default AppRouter
