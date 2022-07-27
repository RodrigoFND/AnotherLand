import { BrowserRouter } from 'react-router-dom'
import AppRouter from './app.router'
import './app.scss'
import SpinnerPageLoader from './app/utils/spinner-page-loader/spinner-page-loader'

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <SpinnerPageLoader />
    </BrowserRouter>
  )
}
