// import { useState } from 'react'
// import {
//   EmployeeType,
//   RegisterEmployee,
// } from '../../../../../../../model/register-employee/register-employee.models'
// import {
//   useAppDispatch,
//   useAppSelector,
// } from '../../../../../../../store/hooks'

function RegisterEmployeeAddComponent() {
  // const [userToDelete, SetUserToDelete] = useState(0)
  // const dispatch = useAppDispatch()
  // const newEmployee: RegisterEmployee = {
  //   id: employess.length + 1,
  //   description: `Rodrigo ${employess.length + 1}`,
  //   cpfCnpj: '037.723.721-39',
  //   employeeType: EmployeeType.FISICA,
  //   phones: [],
  //   inactive: false,
  // }
  return (
    <div>
      Cadastro Colaborador
      {/* <div>
        Deletar Funcionario{' '}
        <button onClick={() => dispatch(deleteRegisterEmployee(userToDelete))}>
          Deletar
        </button>
        <input
          value={userToDelete}
          onChange={(event) => SetUserToDelete(+event.target.value)}
        />
      </div> */}
      {/* <div>
        Cadastrar Novo Employee{' '}
        <button onClick={() => dispatch(addRegisterEmployee(newEmployee))}>
          Clique Aqui
        </button>
      </div> */}
    </div>
  )
}

export default RegisterEmployeeAddComponent
