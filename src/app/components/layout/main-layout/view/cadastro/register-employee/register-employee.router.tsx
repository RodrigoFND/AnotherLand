import { useRoutes } from 'react-router-dom'
import { ERoles } from '../../../../../../model/auth/auth.models'
import ProtectedRoute from '../../../../../../utils/protected-route/protected-route'
import RegisterEmployeeAddComponent from './register-employee-add/register-employee-add.component'
import RegisterEmployeeEditComponent from './register-employee-edit/register-employee-edit.component'
import RegisterEmployeeListComponent from './register-employee-list/register-employee-list.component'

function RegisterEmployeRouter() {
  return useRoutes([
    {
      path: '',
      element: (
        <ProtectedRoute ERole={ERoles.READ}>
          <RegisterEmployeeListComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: ':id',
      element: (
        <ProtectedRoute ERole={ERoles.EDIT}>
          <RegisterEmployeeEditComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: 'add',
      element: (
        <ProtectedRoute ERole={ERoles.ADD}>
          <RegisterEmployeeAddComponent />
        </ProtectedRoute>
      ),
    },
  ])
}

export default RegisterEmployeRouter
