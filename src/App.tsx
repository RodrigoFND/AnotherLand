import { useAppDispatch, useAppSelector } from './app/store/hooks'
import { restocked } from './app/store/register-employee-state/register-employee.reducer'

export const App = () => {
  const numOfCakes = useAppSelector((state) => state.registerEmployee.numOfCkes)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>App Root {numOfCakes}</h1>{' '}
      <button onClick={() => dispatch(restocked(2))}>Teste</button>
    </div>
  )
}
