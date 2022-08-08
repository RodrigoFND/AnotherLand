import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { RegisterEmployee } from '../../../model/Register/register-employee/register-employee.models'
import { ErrorAction, ErrorMessage } from '../../../model/root/root-model'
import { RegisterEmployeeService } from '../../../services/register-employee/register-employee.service'
import reducerErrorToast from '../../../utils/reducer-error-toast/reducer-error-toast'
import { SpinnerPageLoaderAction } from '../../spinner-page-loader-state/spinner-page-loader.reducer'

type RegisterEmployeeStateData = {
  employees: RegisterEmployee[]
  employee: RegisterEmployee
}

const initialState: RegisterEmployeeStateData = {
  employees: [],
  employee: null,
}

const namespace = 'registerEmployeeSlice'

const getRegisterEmployee = createAsyncThunk<RegisterEmployee[], string>(
  `${namespace}/getRegisterEmployee`,
  async (payload, thunkApi) => {
    try {
      const query = !payload ? '' : payload
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } = await RegisterEmployeeService.GetRegisterEmployee(query)
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const getRegisterEmployeeById = createAsyncThunk<RegisterEmployee, number>(
  `${namespace}/getRegisterEmployeeById`,
  async (userId, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } = await RegisterEmployeeService.GetRegisterEmployeeById(
        userId
      )
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data as RegisterEmployee
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const getRegisterEmployeeBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeStateData>
): ActionReducerMapBuilder<RegisterEmployeeStateData> => {
  return builder
    .addCase(getRegisterEmployee.fulfilled, (state, { payload }) => {
      if (payload) {
        state.employees = payload
      }
    })
    .addCase(getRegisterEmployee.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('loginWithPassword - Reject ')
      console.log(action.payload)
    })
}

const getRegisterEmployeeByIdBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeStateData>
): ActionReducerMapBuilder<RegisterEmployeeStateData> => {
  return builder
    .addCase(getRegisterEmployeeById.fulfilled, (state, { payload }) => {
      state.employee = payload
    })
    .addCase(getRegisterEmployeeById.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('getRegisterEmployeeById - Reject ')
      console.log(action.payload)
    })
}

const registerEmployeeSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getRegisterEmployeeBuilder(builder)
    getRegisterEmployeeByIdBuilder(builder)
  },
})

export default registerEmployeeSlice.reducer

export const RegisterEmployeeAction = {
  ...registerEmployeeSlice.actions,
  getRegisterEmployee,
  getRegisterEmployeeById,
}
