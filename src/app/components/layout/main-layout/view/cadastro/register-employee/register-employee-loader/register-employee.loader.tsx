import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'

function RegisterEmployeeLoader(props: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isDependenciesLoaded, setDependenciesLoaded] = useState(false)
  useEffect(() => {
    switch (props.eRole) {
      case ERoles.ADD:
        return

      case ERoles.EDIT:
        return

      default:
        const loadDependencies = async () => {
          Promise.all([GetRegisterEmployee()])
            .then(() => {
              setDependenciesLoaded(true)
            })
            .catch(() => navigate('/home'))
        }
        loadDependencies()
        return
    }
  }, [])

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
  return <>{isDependenciesLoaded ? props.children : 'LoadingDependencies'}</>
}

export default RegisterEmployeeLoader
