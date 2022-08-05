import { useLocation } from 'react-router-dom'
import { ERoles } from '../../model/auth/auth.models'
import { useAppSelector } from '../../store/hooks'

function useRolePermission() {
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()

  const verifyUserRolePathPermission = (role: ERoles): boolean => {
    if (!user) {
      console.log('Not Authorized')
      return false
    }
    const hasPath = user.pagesPermission.find((page) =>
      location.pathname.includes(page.path)
    )
    if (!hasPath) {
      console.log('Authorized')
      return true
    }
    const hasRole = hasPath.roles.find((pathRole) => pathRole == role)
    if (hasRole == null) {
      console.log('Not Authorized')
      return false
    }
    console.log('Authorized')
    return true
  }

  return verifyUserRolePathPermission
}

export default useRolePermission
