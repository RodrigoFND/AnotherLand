export class User {
  id: number
  userName: string
}

export class MToken extends User {
  iat: number
  exp: number
}

export interface UserLogin {
  userName: string
  password: string
}

// export enum EAuthenticationStatus {
//   AUTHENTICATED = 0,
//   VERIFYING = 1,
//   NOTAUTHENTICATED = 2,
// }
