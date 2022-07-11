import { useRoutes } from 'react-router-dom'
import RegisterEmployeeAddComponent from './register-employee-add/register-employee-add.component'
import RegisterEmployeeEditComponent from './register-employee-edit/register-employee-edit.component'
import RegisterEmployeeListComponent from './register-employee-list/register-employee-list.component'

function RegisterEmployeRouter() {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'registeremployee',
          element: <RegisterEmployeeListComponent />,
        },
        {
          path: 'registeremployee/:id',
          element: <RegisterEmployeeEditComponent />,
        },
        {
          path: 'registeremployee/add',
          element: <RegisterEmployeeAddComponent />,
        },
      ],
    },
  ])
}

export default RegisterEmployeRouter
