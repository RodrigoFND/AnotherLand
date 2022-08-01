export type Props = {
  children: JSX.Element
}

export interface ErrorMessage {
  response: { data: { message: string } }
}
