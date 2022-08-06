import AppRouter from './app.router'
import './app.scss'
import UserAuth from './app/components/auth/userAuth'
import ToastComponent from './app/shared/components/toast/toast.component'
import { useAppSelector } from './app/store/hooks'
import LoadingPage from './app/utils/loading-page/loading-page'
import SpinnerPageLoader from './app/utils/spinner-page-loader/spinner-page-loader'

export const App = () => {
  const user = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.token)

  const renderLoadingPage = () => {
    if (!user && token) {
      return <LoadingPage />
    }
  }

  return (
    <>
      {renderLoadingPage()}
      <AppRouter />
      <SpinnerPageLoader />
      <ToastComponent />
      <UserAuth />
    </>
  )
}
