import { Link } from 'react-router-dom'

function RegisterTaskListComponent() {
  return (
    <div>
      Task List Component
      <li>
        <Link to="../:1">Id</Link>
      </li>
      <li>
        <Link to="../add">Add</Link>
      </li>
    </div>
  )
}

export default RegisterTaskListComponent
