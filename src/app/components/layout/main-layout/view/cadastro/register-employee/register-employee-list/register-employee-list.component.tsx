import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'
import { ERoles } from '../../../../../../../model/auth/auth.models'

function RegisterEmployeeListComponent() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const employees: RegisterEmployee[] = useAppSelector(
    (state) => state.registerEmployee.employees
  )
  const rolesPermission = useRolePermission()

  useEffect(() => {
    dispatch(RegisterEmployeeAction.getRegisterEmployee('')).then(() =>
      console.log('SaySomething')
    )
  }, [dispatch])

  const openEmployeeEditPage = (employeeId: number) => {
    navigate(`../${employeeId}`, { replace: true })
  }

  const openAddPage = () => {
    navigate(`../add`, { replace: true })
  }
  return (
    <div>
      <div>
        <button onClick={() => openAddPage()}>Add</button>
        <button onClick={() => rolesPermission(ERoles.EDIT)}>
          Check Permission
        </button>
      </div>
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
        </div>
      ))}
    </div>
  )
}

export default RegisterEmployeeListComponent
