import { useRoutes } from 'react-router-dom'
import { ERoles } from '../../../../../../model/auth/auth.models'
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
        <ProtectedRoute ERole={ERoles.READ}>
          <RegisterEmployeeLoader>
            <RegisterEmployeeListComponent />
          </RegisterEmployeeLoader>
        </ProtectedRoute>
      ),
    },
    {
      path: ':id',
      element: (
        <ProtectedRoute ERole={ERoles.EDIT}>
          <RegisterEmployeeLoader>
            <RegisterEmployeeEditComponent />
          </RegisterEmployeeLoader>
        </ProtectedRoute>
      ),
    },
    {
      path: 'add',
      element: (
        <ProtectedRoute ERole={ERoles.ADD}>
          <RegisterEmployeeLoader>
            <RegisterEmployeeAddComponent />
          </RegisterEmployeeLoader>
        </ProtectedRoute>
      ),
    },
  ])
}

export default RegisterEmployeRouter
