import { useRoutes } from 'react-router-dom'
import { ERoles } from '../../../../../../model/auth/auth.models'
import { Menu } from '../../../../../../utils/menu-tree/menu-tree'
import ProtectedRoute from '../../../../../../utils/protected-route/protected-route'
import RegisterRolePermissionEditComponent from './register-role-permission-edit/register-role-permission-edit.component'
import RegisterRolePermissionListComponent from './register-role-permission-list/register-role-permission-list.component'
import RegisterRolePermissionLoader from './register-role-permission-loader/register-role-permission.loader'

function RegisterRolePermissionRouter() {
  return useRoutes([
    {
      path: '',
      element: (
        <ProtectedRoute eRole={ERoles.READ}>
          <RegisterRolePermissionLoader>
            <RegisterRolePermissionListComponent
              tree={Menu.register.text + ' / Register role permission'}
              header={'Register role permission'}
            />
          </RegisterRolePermissionLoader>
        </ProtectedRoute>
      ),
    },
    {
      path: ':id',
      element: (
        <ProtectedRoute eRole={ERoles.READ}>
          <RegisterRolePermissionLoader eRole={ERoles.EDIT}>
            <RegisterRolePermissionEditComponent
              tree={Menu.register.text + ' / Register role permission / Edit'}
              header={'Register role permission'}
            />
          </RegisterRolePermissionLoader>
        </ProtectedRoute>
      ),
    },
  ])
}

export default RegisterRolePermissionRouter
