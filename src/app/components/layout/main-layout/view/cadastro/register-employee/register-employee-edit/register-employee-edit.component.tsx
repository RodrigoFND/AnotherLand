import { useNavigate } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import { toastWarning } from '../../../../../../../shared/components/toast/toast.component'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'
import RegisterEmployeeComponent from '../register-employee.component'

function RegisterEmployeeEditComponent(props: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const checkRolesPermission = useRolePermission()
  const employee = useAppSelector((state) => state.registerEmployee.employee)

  const updateEmployee = (employeeUpdated: RegisterEmployee) => {
    if (!checkRolesPermission(ERoles.EDIT)) {
      toastWarning("User doesn't have permission to edit employee")
      return
    }
    dispatch(RegisterEmployeeAction.updateRegisterEmployee(employeeUpdated))
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
          onChangeEmployee={updateEmployee}
          employee={employee}
          tree={props.tree}
          eRole={ERoles.EDIT}
          header={props.header + ': ' + employee?.description}
        />
      )}
    </>
  )
}

export default RegisterEmployeeEditComponent
