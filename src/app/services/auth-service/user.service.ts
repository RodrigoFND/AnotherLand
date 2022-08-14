import { User, UserLogin } from '../../model/auth/auth.models'
import { Service } from '../service'

const URL_PATH = '/user'

function userLoginWithPassword(userLoginData: UserLogin) {
  return Service.LoginWithPassword({
    path: `${URL_PATH}/login`,
    body: userLoginData,
    headers: null,
  })
}

function userLoginWithToken(userLoginData: UserLogin) {
  return Service.LoginWithPassword({
    path: `${URL_PATH}/loginWithToken`,
    body: userLoginData,
    headers: { token: userLoginData.password },
  })
}

function userLogout(userData: User) {
  return Service.Logout({
    path: `${URL_PATH}/logout`,
    body: userData,
  })
}

function userForgotPassword(email: string) {
  return Service.Logout({
    path: `${URL_PATH}/forgotPassword`,
    body: { email: email },
  })
}

function userVerifyResetToken(tokenId: string) {
  return Service.Post({
    path: `${URL_PATH}/verifyResetPasswordToken`,
    body: { tokenId: tokenId },
  })
}

function userResetPassword(tokenId: number, newPassword: string) {
  return Service.Post({
    path: `${URL_PATH}/resetPassword`,
    body: { tokenId: tokenId, password: newPassword },
  })
}

export const UserService = {
  userLoginWithPassword,
  userLoginWithToken,
  userLogout,
  userForgotPassword,
  userVerifyResetToken,
  userResetPassword,
}
