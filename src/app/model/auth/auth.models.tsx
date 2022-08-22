import { MRegisterRolePermission } from '../Register/register-role-permission/register-role-permission.model'

export class User {
  id: number
  userName: string
  email: string
  password: number
  role: MRegisterRolePermission
  inactive: boolean
}

export class MRolePages {
  path: string
  roles: ERoles[]
}

export enum ERoles {
  READ = 0,
  ADD = 1,
  EDIT = 2,
  REMOVE = 3,
}

export class MToken extends User {
  iat: number
  exp: number
}

export interface UserLogin {
  userName: string
  password: string
}
