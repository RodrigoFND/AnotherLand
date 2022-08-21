import { RegisterEmployee } from '../../model/Register/register-employee/register-employee.models'
import { Service } from '../service'

const URL_PATH = '/registeremployee'

function getRegisterEmployee(query: string) {
  return Service.Get({
    path: `${URL_PATH}/${query}`,
  })
}

function getRegisterEmployeeById(id: string) {
  return Service.Get({
    path: `${URL_PATH}/${id}`,
  })
}

function addRegisterEmployee(employeeData: RegisterEmployee) {
  return Service.Post({
    path: `${URL_PATH}`,
    body: employeeData,
  })
}

function updateRegisterEmployee(employeeData: RegisterEmployee) {
  return Service.Put({
    path: `${URL_PATH}`,
    body: employeeData,
  })
}

function deleteRegisterEmployee(id: number) {
  return Service.Delete({
    path: `${URL_PATH}/${id}`,
  })
}

export const RegisterEmployeeService = {
  GetRegisterEmployee: getRegisterEmployee,
  GetRegisterEmployeeById: getRegisterEmployeeById,
  AddRegisterEmployee: addRegisterEmployee,
  UpdateRegisterEmployee: updateRegisterEmployee,
  DeleteRegisterEmployee: deleteRegisterEmployee,
}
