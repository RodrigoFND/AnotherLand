import { ERoles } from '../../auth/auth.models'

export interface MRegisterRolePermission {
  id: number
  description: string
  pagesPermission: MRolePermission[]
}

export interface MCustomPermission {
  id: number
  path: string
  canRead: boolean
  canAdd: boolean
  canEdit: boolean
  canRemove: boolean
}

export interface MRolePermission {
  id: number
  path: string
  roles: ERoles[]
}
