// import { useState } from 'react'
// import {
//   EmployeeType,
//   RegisterEmployee,
// } from '../../../../../../../model/register-employee/register-employee.models'
// import {
//   useAppDispatch,
//   useAppSelector,
// } from '../../../../../../../store/hooks'

import { Button } from 'react-bootstrap'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'

function RegisterEmployeeAddComponent(props: Props) {
  const rolesPermission = useRolePermission()
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
    <>
      <CustomBreadcrumbComponent
        tree={props.tree}
        header={props.header}
      ></CustomBreadcrumbComponent>
      <div>
        Cadastro Colaborador
        <Button onClick={() => rolesPermission(ERoles.ADD)}>Check Role</Button>
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
    </>
  )
}

export default RegisterEmployeeAddComponent
