import { ERoles } from '../auth/auth.models'

export class Props {
  children?: JSX.Element
  ERole?: ERoles
}

export interface ErrorAction {
  response: { data: { message: string } }
}

export interface ErrorMessage {
  message: string
}

export interface Response {
  error: unknown
  payload: unknown
  meta: unknown
}
