import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { MToken, UserLogin } from '../../model/auth/auth.models'
import useMouseIdle from '../../shared/hooks/use-mouse-idle'
import { AuthAction } from '../../store/auth-state/auth.reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const UserAuth = () => {
  const dispatch = useAppDispatch()
  const isMouseIdle = useMouseIdle()
  const user = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.token)
  const decodedToken: MToken = token ? jwtDecode(token) : null
  let intervalForRestartValidation: NodeJS.Timer = null

  useEffect(() => {
    if (intervalForRestartValidation) {
      clearInterval(intervalForRestartValidation)
    }
    verifyUserAuthentication()
    return () => {
      if (intervalForRestartValidation) {
        clearInterval(intervalForRestartValidation)
      }
    }
  }, [token])

  useEffect(() => {
    if (!isMouseIdle) {
      return
    }
    if (intervalForRestartValidation) {
      clearInterval(intervalForRestartValidation)
    }
    disauthenticateUser()
  }, [isMouseIdle])

  const disauthenticateUser = (): void => {
    dispatch(AuthAction.expireUserAuth())
  }

  const checkTokenExpired = (): boolean => {
    const isTokenExpired = decodedToken.exp < Date.now() / 1000
    return isTokenExpired
  }

  const verifyTokenEmpty = (): void => {
    dispatch(AuthAction.clearAuthState())
  }

  const verifyTokenWithoutUser = (): void => {
    const userData: UserLogin = {
      userName: decodedToken.userName,
      password: token,
    }
    if (checkTokenExpired()) {
      dispatch(AuthAction.clearAuthState())
    } else {
      dispatch(AuthAction.loginWithToken(userData))
    }
  }

  const verifyTokenWithUser = (): void => {
    const userData: UserLogin = {
      userName: decodedToken.userName,
      password: token,
    }
    const tokenTimeInMiliseconds = (decodedToken.exp - decodedToken.iat) * 1000
    const timeForPreventCall = 20 * 1000
    if (tokenTimeInMiliseconds < timeForPreventCall) {
      console.log(
        `Token time is less then ${
          timeForPreventCall / 1000
        } seconds, to prevent multiple Api call, logout`
      )
      return
    }
    const bufferTimeInMilisenconds = 4000
    const timeCloseToExpire = tokenTimeInMiliseconds - bufferTimeInMilisenconds
    console.log('Validation starts')
    intervalForRestartValidation = setInterval(() => {
      console.log('Validating')
      dispatch(AuthAction.loginWithToken(userData))
    }, timeCloseToExpire)
  }

  const verifyUserAuthentication = () => {
    if (user && !token) {
      return
    }
    if (!token) {
      verifyTokenEmpty()
    }
    if (token && !user) {
      verifyTokenWithoutUser()
      return
    }
    if (token && user) {
      verifyTokenWithUser()
    }
  }

  return <></>
}

export default UserAuth
