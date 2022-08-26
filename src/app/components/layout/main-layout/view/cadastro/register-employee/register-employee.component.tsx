import { useAppSelector } from '../../../../../../store/hooks'

function RegisterEmployeeComponent() {
  const employess = useAppSelector((state) => state.registerEmployee.employees)

  return (
    <div>
      {employess.map((employee) => (
        <div key={employee.id}>
          <div> Id: {employee.id} </div>
          <div> Nome: {employee.description} </div>
          <div> Cpf: {employee.cpfCnpj} </div>
          <div> Tipo: {employee.employeeType} </div>
          <div> Inativo: {employee.inactive} </div>
          <div> Telefones: {employee.phone} </div>
        </div>
      ))}
    </div>
  )
}

export default RegisterEmployeeComponent
