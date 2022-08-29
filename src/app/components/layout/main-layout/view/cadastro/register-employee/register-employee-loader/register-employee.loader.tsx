import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { MRegisterRolePermission } from '../../../../../../../model/Register/register-role-permission/register-role-permission.model'
import { Props } from '../../../../../../../model/root/root-model'
import { toastWarning } from '../../../../../../../shared/components/toast/toast.component'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'
import { RegisterRolePermissionAction } from '../../../../../../../store/register/register-role-permission-state/register-role-permission.reducer'

function RegisterEmployeeLoader(props: Props) {
  const [user] = useState(useAppSelector((state) => state.auth.user))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams()
  const [isDependenciesLoaded, setDependenciesLoaded] = useState(false)
  useEffect(() => {
    let loadDependencies = null
    switch (props.eRole) {
      case ERoles.ADD:
        loadDependencies = async () => {
          Promise.all([GetRoles()])
            .then(() => {
              setDependenciesLoaded(true)
            })
            .catch(() => navigate('../'))
        }
        loadDependencies()
        return

      case ERoles.EDIT:
        loadDependencies = async () => {
          Promise.all([GetRegisterEmployeeById(), GetRoles()])
            .then(() => {
              setDependenciesLoaded(true)
            })
            .catch(() => navigate('../'))
        }
        loadDependencies()
        return

      default:
        loadDependencies = async () => {
          Promise.all([GetRegisterEmployee()])
            .then(() => {
              setDependenciesLoaded(true)
            })
            .catch(() => navigate('/home'))
        }
        loadDependencies()
        return
    }
  })

  const GetRegisterEmployee = () => {
    return new Promise<RegisterEmployee[]>((resolve, reject) => {
      dispatch(RegisterEmployeeAction.getRegisterEmployee(''))
        .unwrap()
        .then((response) => {
          resolve(response)
        })
        .catch(() => {
          reject()
        })
    })
  }

  const GetRegisterEmployeeById = () => {
    return new Promise<RegisterEmployee>((resolve, reject) => {
      dispatch(RegisterEmployeeAction.getRegisterEmployeeById(params.id))
        .unwrap()
        .then((employee) => {
          const isUserAdmin = user.id == 1
          const isEmployeeAdmin = employee.roleId == 1
          if (!isUserAdmin && isEmployeeAdmin) {
            toastWarning('Only admin profile is allow to access this employee.')
            reject()
            return
          }
          resolve(employee)
        })
        .catch(() => {
          reject()
        })
    })
  }

  const GetRoles = () => {
    return new Promise<MRegisterRolePermission[]>((resolve, reject) => {
      dispatch(RegisterRolePermissionAction.getRegisterRolePermission(''))
        .unwrap()
        .then((response) => {
          resolve(response)
        })
        .catch(() => {
          reject()
        })
    })
  }
  return <>{isDependenciesLoaded ? props.children : 'LoadingDependencies'}</>
}

export default RegisterEmployeeLoader
