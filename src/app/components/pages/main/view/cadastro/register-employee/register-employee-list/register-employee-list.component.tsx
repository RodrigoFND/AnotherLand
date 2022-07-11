import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../../../store/hooks'

function RegisterEmployeeListComponent() {
  const navigate = useNavigate()
  const employees = useAppSelector((state) => state.registerEmployee.employees)
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
        </div>
      ))}
    </div>
  )
}

export default RegisterEmployeeListComponent
