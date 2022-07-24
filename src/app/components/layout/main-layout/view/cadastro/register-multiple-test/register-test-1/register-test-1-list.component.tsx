import { Link } from 'react-router-dom'

function RegisterTestListComponent() {
  return (
    <div>
      Test List Component
      <li>
        <Link to="../:1">Id</Link>
      </li>
      <li>
        <Link to="../add">Add</Link>
      </li>
    </div>
  )
}

export default RegisterTestListComponent
