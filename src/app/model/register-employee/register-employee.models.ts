import { MRegisterPrivilegeGroup } from '../register-privilege-group/register-privilege-group.model'

export interface RegisterEmployee {
  id: number
  description: string
  cpfCnpj: string
  employeeType: EmployeeType
  phones?: number[]
  privilegeGroup?: MRegisterPrivilegeGroup
  inactive: boolean
}

export enum EmployeeType {
  FISICA = 0,
  JURIDICA = 1,
}
