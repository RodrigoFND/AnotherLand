import { useRoutes } from 'react-router-dom'
import { ERoles } from '../../../../../../model/auth/auth.models'
import { Menu } from '../../../../../../utils/menu-tree/menu-tree'
import ProtectedRoute from '../../../../../../utils/protected-route/protected-route'
import RegisterEmployeeAddComponent from './register-employee-add/register-employee-add.component'
import RegisterEmployeeEditComponent from './register-employee-edit/register-employee-edit.component'
import RegisterEmployeeListComponent from './register-employee-list/register-employee-list.component'
import RegisterEmployeeLoader from './register-employee-loader/register-employee.loader'

function RegisterEmployeRouter() {
  return useRoutes([
    {
      path: '',
      element: (
        <ProtectedRoute eRole={ERoles.READ}>
          <RegisterEmployeeLoader>
            <RegisterEmployeeListComponent
              tree={Menu.register.text + ' / Register employee'}
              header={'Register employee'}
            />
          </RegisterEmployeeLoader>
        </ProtectedRoute>
      ),
    },
    {
      path: ':id',
      element: (
        <ProtectedRoute eRole={ERoles.READ}>
          <RegisterEmployeeLoader eRole={ERoles.EDIT}>
            <RegisterEmployeeEditComponent
              tree={Menu.register.text + ' / Register employee / Edit'}
              header={'Register employee'}
            />
          </RegisterEmployeeLoader>
        </ProtectedRoute>
      ),
    },
    {
      path: 'add',
      element: (
        <ProtectedRoute eRole={ERoles.ADD}>
          <RegisterEmployeeLoader eRole={ERoles.EDIT}>
            <RegisterEmployeeAddComponent
              tree={Menu.register.text + ' / Register employee / Add'}
              header={'Register employee'}
            />
          </RegisterEmployeeLoader>
        </ProtectedRoute>
      ),
    },
  ])
}

export default RegisterEmployeRouter
