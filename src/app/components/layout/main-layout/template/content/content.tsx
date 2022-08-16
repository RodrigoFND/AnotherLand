import { Outlet } from 'react-router-dom'

function Content() {
  return (
    <div className="px-3">
      <Outlet />
    </div>
  )
}

export default Content
