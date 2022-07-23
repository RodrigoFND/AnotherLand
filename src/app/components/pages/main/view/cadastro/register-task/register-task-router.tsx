import { useRoutes } from 'react-router-dom'
import RegisterTaskAddComponent from './register-task-add/register-task-add.component'
import RegisterTaskEditComponent from './register-task-edit/register-task-edit.component'
import RegisterTaskListComponent from './register-task-list/register-task-list.component'

function RegisterTaskRouter() {
  return useRoutes([
    {
      path: '',
      element: <RegisterTaskListComponent />,
    },
    {
      path: '/:id',
      element: <RegisterTaskEditComponent />,
    },
    {
      path: '/add',
      element: <RegisterTaskAddComponent />,
    },
  ])
}

export default RegisterTaskRouter
