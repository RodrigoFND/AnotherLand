import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'

function RegisterEmployeeLoader(props: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams()
  const [isDependenciesLoaded, setDependenciesLoaded] = useState(false)
  useEffect(() => {
    let loadDependencies = null
    switch (props.eRole) {
      case ERoles.ADD:
        return

      case ERoles.EDIT:
        loadDependencies = async () => {
          Promise.all([GetRegisterEmployeeById()])
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
