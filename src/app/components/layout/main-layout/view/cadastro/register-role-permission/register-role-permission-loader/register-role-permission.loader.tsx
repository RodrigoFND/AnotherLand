import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { MRegisterRolePermission } from '../../../../../../../model/Register/register-role-permission/register-role-permission.model'
import { Props } from '../../../../../../../model/root/root-model'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterRolePermissionAction } from '../../../../../../../store/register/register-role-permission-state/register-role-permission.reducer'
import SkeletonListPage from '../../../../../../../utils/loading-page/skeleton-loading-page/skeleton-list-page/skeleton-list-page'

function RegisterRolePermissionLoader(props: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const params = useParams()
  const [isDependenciesLoaded, setDependenciesLoaded] = useState(false)
  useEffect(() => {
    let loadDependencies = null
    switch (props.eRole) {
      case ERoles.EDIT:
        loadDependencies = async () => {
          Promise.all([GetRolesById()])
            .then(() => {
              setDependenciesLoaded(true)
            })
            .catch(() => navigate('../'))
        }
        loadDependencies()
        return

      default:
        loadDependencies = async () => {
          Promise.all([GetRoles()])
            .then(() => {
              setDependenciesLoaded(true)
            })
            .catch(() => navigate('/home'))
        }
        loadDependencies()
        return
    }
  })

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

  const GetRolesById = () => {
    return new Promise<MRegisterRolePermission>((resolve, reject) => {
      dispatch(
        RegisterRolePermissionAction.getRegisterRolePermissionById(params.id)
      )
        .unwrap()
        .then((response) => {
          resolve(response)
        })
        .catch(() => {
          reject()
        })
    })
  }

  return <>{isDependenciesLoaded ? props.children : <SkeletonListPage />}</>
}

export default RegisterRolePermissionLoader
