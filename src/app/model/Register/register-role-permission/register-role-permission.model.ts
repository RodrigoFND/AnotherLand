import { ERoles } from '../../auth/auth.models'

export interface MRegisterRolePermission {
  id: number
  description: string
  pagesPermission: [
    {
      path: string
      roles: ERoles[]
    }
  ]
}
