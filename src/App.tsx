// import { useAppDispatch, useAppSelector } from './app/store/hooks'
// import { restocked } from './app/store/register-employee-state/register-employee.reducer'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './app.router'
import './app.scss'

export const App = () => {
  // const numOfCakes = useAppSelector((state) => state.registerEmployee.numOfCkes)
  // const dispatch = useAppDispatch()
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
