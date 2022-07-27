import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { RegisterEmployee } from '../../../model/Register/register-employee/register-employee.models'
import { RegisterEmployeeService } from '../../../services/register-employee/register-employee.service'
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
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      console.log('getRegisterEmployee - ' + err)
      return null
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
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      console.log('getRegisterEmployeeById - ' + err)
      return null
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
    .addCase(getRegisterEmployee.pending, () => {
      console.log('Pending')
    })
    .addCase(getRegisterEmployee.rejected, () => {
      console.log('Rejected')
    })
}

const getRegisterEmployeeByIdBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeStateData>
): ActionReducerMapBuilder<RegisterEmployeeStateData> => {
  return builder
    .addCase(getRegisterEmployeeById.fulfilled, (state, { payload }) => {
      state.employee = payload
    })
    .addCase(getRegisterEmployeeById.pending, () => {
      console.log('getRegisterEmployeeById - Pending')
    })
    .addCase(getRegisterEmployeeById.rejected, () => {
      console.log('getRegisterEmployeeById - rejected')
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
