import { useRoutes } from 'react-router-dom'
import RegisterEmployeeAddComponent from './register-employee-add/register-employee-add.component'
import RegisterEmployeeListComponent from './register-employee-list/register-employee-list.component'

function RegisterEmployeRouter() {
  return useRoutes([
    {
      path: '',
      element: <RegisterEmployeeListComponent />,
    },
    {
      path: ':id',
      element: <RegisterEmployeeListComponent />,
    },
    {
      path: 'add',
      element: <RegisterEmployeeAddComponent />,
    },
  ])
}

export default RegisterEmployeRouter
