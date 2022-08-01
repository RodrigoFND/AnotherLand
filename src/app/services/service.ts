import axios, { AxiosRequestHeaders } from 'axios'
// import { userAction } from '../store/auth-state/user.reducer'
// import { useAppDispatch, useAppSelector } from '../store/hooks'

export const API_URL = 'http://localhost:3001'

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
})

// async function Service() {
//   const dispatch = useAppDispatch()
//   const userValid = await ValidateUser()
//   if (!userValid) {
//     dispatch(userAction.logout())
//   }
// }

function Login(parameters: {
  path: string
  body: unknown
  headers: AxiosRequestHeaders
}) {
  const { path, body } = parameters
  return axios({
    method: 'post',
    url: `${API_URL + path}`,
    data: body,
    headers: parameters.headers,
  })
}

function Logout(parameters: { path: string; body: unknown }) {
  const { path, body } = parameters
  return axios({
    method: 'post',
    url: `${API_URL + path}`,
    data: body,
  })
}

// function AuthVerifier(parameters: { path: string; body: unknown }) {
//   return axios({
//     method: 'post',
//     url: `${API_URL + 'verifyAuth'}`,
//     data: null,
//     headers: {
//       token,
//     },
//   })
// }

function Get(parameters: { path: string }) {
  const { path } = parameters
  return axios({
    method: 'get',
    url: `${API_URL + path}`,
  })
}

function Post(parameters: { path: string; body: unknown }) {
  const { path, body } = parameters
  return axios({
    method: 'post',
    url: `${API_URL + path}`,
    data: body,
  })
}

function Put(parameters: { path: string; body: unknown }) {
  const { path, body } = parameters
  return axios({
    method: 'put',
    url: `${API_URL + path}`,
    data: body,
  })
}

function Delete(parameters: { path: string }) {
  const { path } = parameters
  return axios({
    method: 'delete',
    url: `${API_URL + path}`,
  })
}

export const Service = {
  LoginWithPassword: Login,
  Logout,
  Get,
  Post,
  Put,
  Delete,
}
