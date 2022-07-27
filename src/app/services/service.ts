import axios from 'axios'
// import { userAction } from '../store/auth-state/user.reducer'
// import { useAppDispatch, useAppSelector } from '../store/hooks'

export const API_URL = 'http://localhost:3001'

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
})

// export function ValidateUser(): boolean {
//   const userLogged = useAppSelector((state) => state.user.isAuthenticated)
//   return userLogged
// }

// async function Service() {
//   const dispatch = useAppDispatch()
//   const userValid = await ValidateUser()
//   if (!userValid) {
//     dispatch(userAction.logout())
//   }
// }

async function Get(parameters: { path: string }) {
  const { path } = parameters
  return axios({
    method: 'get',
    url: `${API_URL + path}`,
  })
}

async function Post(parameters: { path: string; body: unknown }) {
  const { path, body } = parameters
  return axios({
    method: 'post',
    url: `${API_URL + path}`,
    data: body,
  })
}

async function Put(parameters: { path: string; body: unknown }) {
  const { path, body } = parameters
  return axios({
    method: 'put',
    url: `${API_URL + path}`,
    data: body,
  })
}

async function Delete(parameters: { path: string }) {
  const { path } = parameters
  return axios({
    method: 'delete',
    url: `${API_URL + path}`,
  })
}

export const BasicService = {
  Get,
  Post,
  Put,
  Delete,
}
