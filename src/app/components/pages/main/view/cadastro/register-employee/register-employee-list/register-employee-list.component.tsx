import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register-employee-state/register-employee.reducer'
import { RegisterEmployee } from '../../../../../../../model/register-employee/register-employee.models'

function RegisterEmployeeListComponent() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const employees: RegisterEmployee[] = useAppSelector(
    (state) => state.registerEmployee.employees
  )
  console.log('teste')
  useEffect(() => {
    dispatch(RegisterEmployeeAction.getRegisterEmployee()).then(() =>
      console.log('SaySomething')
    )
  }, [dispatch])

  const openEmployeeEditPage = (employeeId: number) => {
    navigate(`../registeremployee/${employeeId}`, { replace: true })
  }
  return (
    <div>
      {employees.map((employee) => (
        <div key={employee.id}>
          <ul>
            <li>Id: {employee.id}</li>
            <li>Name: {employee.description}</li>
            <li>Inativo: {employee.inactive}</li>
          </ul>
          <button onClick={() => openEmployeeEditPage(employee.id)}>
            Acessar
          </button>
          <button
            onClick={() =>
              dispatch(RegisterEmployeeAction.getRegisterEmployee())
            }
          >
            teste
          </button>
        </div>
      ))}
    </div>
  )
}

export default RegisterEmployeeListComponent
