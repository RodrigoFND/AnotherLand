export interface RegisterEmployee {
  id: number
  description: string
  email: string
  cpfCnpj: string
  employeeType: EmployeeType
  password: string
  phone?: string
  roleId: number
  inactive: boolean
}

export enum EmployeeType {
  LEGALPERSON = 0,
  LEGALENTITY = 1,
}

export const EmployeeTypeDescription = [
  {
    id: EmployeeType.LEGALPERSON,
    description: 'Legal person',
  },
  {
    id: EmployeeType.LEGALENTITY,
    description: 'Legal Entity',
  },
]
