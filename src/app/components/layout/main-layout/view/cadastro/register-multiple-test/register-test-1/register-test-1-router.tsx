import { useRoutes } from 'react-router-dom'
import RegisterTestAddComponent from './register-test-1.add.component'
import RegisterTestListComponent from './register-test-1-list.component'
import RegisterTestEditComponent from './register-test-1-edit.component'

function RegisterTest1Router() {
  return useRoutes([
    {
      path: '',
      element: <RegisterTestListComponent />,
    },
    {
      path: '/:id',
      element: <RegisterTestEditComponent />,
    },
    {
      path: '/add',
      element: <RegisterTestAddComponent />,
    },
  ])
}

export default RegisterTest1Router
