import { useNavigate } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import {
  EmployeeType,
  RegisterEmployee,
} from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'
import RegisterEmployeeComponent from '../register-employee.component'

function RegisterEmployeeAddComponent(props: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const employee: RegisterEmployee = {
    id: 0,
    description: '',
    email: '',
    cpfCnpj: '',
    employeeType: EmployeeType.LEGALPERSON,
    password: '',
    phone: '',
    roleId: 2,
    inactive: false,
  }

  const addNewEmployee = (newEmployee: RegisterEmployee) => {
    dispatch(RegisterEmployeeAction.addRegisterEmployee(newEmployee))
      .unwrap()
      .then(() => {
        goBackPage()
      })
      .catch(() => {
        return
      })
  }

  const goBackPage = () => {
    navigate(`../`)
  }

  return (
    <>
      {employee && (
        <RegisterEmployeeComponent
          onChangeEmployee={addNewEmployee}
          employee={employee}
          tree={props.tree}
          eRole={ERoles.ADD}
          header={props.header}
        />
      )}
    </>
  )
}

export default RegisterEmployeeAddComponent
