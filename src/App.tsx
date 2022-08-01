import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import AppRouter from './app.router'
import './app.scss'
import { MToken, UserLogin } from './app/model/auth/auth.models'
import { AuthAction } from './app/store/auth-state/auth.reducer'
import { useAppDispatch, useAppSelector } from './app/store/hooks'
import SpinnerPageLoader from './app/utils/spinner-page-loader/spinner-page-loader'

export const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.token)
  const [intervalForRestartValidation, setIntervalForRestartValidation] =
    useState<NodeJS.Timer>()
  const decodedToken: MToken = token ? jwtDecode(token) : null

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
    setIntervalForRestartValidation(
      setInterval(() => {
        console.log('Validating')
        dispatch(AuthAction.loginWithToken(userData))
      }, timeCloseToExpire)
    )
  }

  const verifyUserAuthentication = () => {
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

  return (
    <>
      <AppRouter />
      <SpinnerPageLoader />
    </>
  )
}
