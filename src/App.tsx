// import { useAppDispatch, useAppSelector } from './app/store/hooks'
// import { restocked } from './app/store/register-employee-state/register-employee.reducer'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './app.router'
import './app.scss'
import LoadingSpinner from './app/utils/loading-spinner/loading-spinner'

export const App = () => {
  // const numOfCakes = useAppSelector((state) => state.registerEmployee.numOfCkes)
  // const dispatch = useAppDispatch()
  return (
    <BrowserRouter>
      <AppRouter />
      <LoadingSpinner />
    </BrowserRouter>
  )
}
