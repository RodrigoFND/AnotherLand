export interface User {
  id: number
  description: string
  password: string
  token: string
}

export interface UserLogin {
  userName: string
  password: string
}
