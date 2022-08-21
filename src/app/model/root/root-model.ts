import { GridFilterModel } from '@mui/x-data-grid/models/gridFilterModel'
import { GridRowParams } from '@mui/x-data-grid/models/params/gridRowParams'
import { ERoles } from '../auth/auth.models'

export class Props {
  children?: JSX.Element[] | JSX.Element
  eRole?: ERoles
  tree?: string
  header?: string
}

export class MMuiDataGrid {
  filter?: GridFilterModel
  onRowClick?: (params: GridRowParams) => void
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
