export interface RegisterEmployee {
  id: number
  description: string
  email: string
  cpfCnpj: string
  employeeType: EmployeeType
  password: string
  phones?: number[]
  roleId: number
  inactive: boolean
}

export enum EmployeeType {
  FISICA = 0,
  JURIDICA = 1,
}
