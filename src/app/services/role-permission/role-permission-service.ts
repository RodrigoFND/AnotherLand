import { MRegisterRolePermission } from '../../model/Register/register-role-permission/register-role-permission.model'
import { Service } from '../service'

const URL_PATH = '/rolePermission'

function getRegisterRolePermission(query: string) {
  return Service.Get({
    path: `${URL_PATH}/${query}`,
  })
}

function getRegisterRolePermissionById(id: string) {
  return Service.Get({
    path: `${URL_PATH}/${id}`,
  })
}

function addRegisterRolePermission(rolePermission: MRegisterRolePermission) {
  return Service.Post({
    path: `${URL_PATH}`,
    body: rolePermission,
  })
}

function updateRegisterRolePermission(employeeData: MRegisterRolePermission) {
  return Service.Put({
    path: `${URL_PATH}`,
    body: employeeData,
  })
}

function deleteRegisterRolePermission(id: number) {
  return Service.Delete({
    path: `${URL_PATH}/${id}`,
  })
}

export const RegisterRolePermissionService = {
  GetRegisterRolePermission: getRegisterRolePermission,
  GetRegisterRolePermissionById: getRegisterRolePermissionById,
  AddRegisterRolePermission: addRegisterRolePermission,
  UpdateRegisterRolePermission: updateRegisterRolePermission,
  DeleteRegisterRolePermission: deleteRegisterRolePermission,
}
