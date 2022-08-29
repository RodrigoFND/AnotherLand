import { ERoles } from '../../auth/auth.models'

export interface MRegisterRolePermission {
  id: number
  description: string
  pagesPermission: MRolePermission[]
}

export interface MRolePermission {
  id: number
  path: string
  roles: ERoles[]
}
