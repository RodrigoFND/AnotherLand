import { RegisterEmployee } from '../../model/Register/register-employee/register-employee.models'
import { BasicService } from '../service'

const URL_PATH = '/registeremployee'

function GetRegisterEmployee(query: string) {
  return BasicService.Get({
    path: `${URL_PATH}/${query}`,
  })
}

function GetRegisterEmployeeById(id: number) {
  return BasicService.Get({
    path: `${URL_PATH}/${id}`,
  })
}

function AddRegisterEmployee(employeeData: RegisterEmployee) {
  return BasicService.Post({
    path: `${URL_PATH}`,
    body: employeeData,
  })
}

function UpdateRegisterEmployee(employeeData: RegisterEmployee) {
  return BasicService.Put({
    path: `${URL_PATH}`,
    body: employeeData,
  })
}

function DeleteRegisterEmployee(id: number) {
  return BasicService.Delete({
    path: `${URL_PATH}/${id}`,
  })
}

export const RegisterEmployeeService = {
  GetRegisterEmployee,
  GetRegisterEmployeeById,
  AddRegisterEmployee,
  UpdateRegisterEmployee,
  DeleteRegisterEmployee,
}
