import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { RegisterEmployee } from '../../../model/Register/register-employee/register-employee.models'
import { ErrorAction, ErrorMessage } from '../../../model/root/root-model'
import { RegisterEmployeeService } from '../../../services/register-employee/register-employee.service'
import { toastMessage } from '../../../shared/components/toast/toast.component'
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
      console.log('getRegisterEmployee - Reject ')
      console.log(action.payload)
    })
}

const getRegisterEmployeeById = createAsyncThunk<RegisterEmployee, string>(
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

const addRegisterEmployee = createAsyncThunk<
  RegisterEmployee,
  RegisterEmployee
>(`${namespace}/addRegisterEmployee`, async (employeeData, thunkApi) => {
  try {
    thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
    const { data } = await RegisterEmployeeService.AddRegisterEmployee(
      employeeData
    )
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return data as RegisterEmployee
  } catch (err) {
    const error: ErrorAction = err as ErrorAction
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return thunkApi.rejectWithValue(error.response.data)
  }
})

const addRegisterEmployeeBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeStateData>
): ActionReducerMapBuilder<RegisterEmployeeStateData> => {
  return builder
    .addCase(addRegisterEmployee.fulfilled, () => {
      toastMessage.toastSuccess('Employee registered successfully')
    })
    .addCase(addRegisterEmployee.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('addRegisterEmployeeBuilder - Reject ')
      console.log(action.payload)
    })
}

const updateRegisterEmployee = createAsyncThunk<
  RegisterEmployee,
  RegisterEmployee
>(`${namespace}/updateRegisterEmployee`, async (employeeData, thunkApi) => {
  try {
    thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
    const { data } = await RegisterEmployeeService.UpdateRegisterEmployee(
      employeeData
    )
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return data as RegisterEmployee
  } catch (err) {
    const error: ErrorAction = err as ErrorAction
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return thunkApi.rejectWithValue(error.response.data)
  }
})

const updateRegisterEmployeeBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeStateData>
): ActionReducerMapBuilder<RegisterEmployeeStateData> => {
  return builder
    .addCase(updateRegisterEmployee.fulfilled, () => {
      toastMessage.toastSuccess('Employee updated successfully')
    })
    .addCase(updateRegisterEmployee.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('updateRegisterEmployeeBuilder - Reject ')
      console.log(action.payload)
    })
}

const deleteRegisterEmployee = createAsyncThunk<number, number>(
  `${namespace}/deleteRegisterEmployee`,
  async (employeeId, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      await RegisterEmployeeService.DeleteRegisterEmployee(employeeId)
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return employeeId
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const deleteRegisterEmployeeBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeStateData>
): ActionReducerMapBuilder<RegisterEmployeeStateData> => {
  return builder
    .addCase(deleteRegisterEmployee.fulfilled, (state, { payload }) => {
      toastMessage.toastSuccess('Employee deleted successfully')
      state.employees = state.employees.filter(
        (employee) => employee.id != payload
      )
    })
    .addCase(deleteRegisterEmployee.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('deleteRegisterEmployeeBuilder - Reject ')
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
    addRegisterEmployeeBuilder(builder)
    updateRegisterEmployeeBuilder(builder)
    deleteRegisterEmployeeBuilder(builder)
  },
})

export const RegisterEmployeeAction = {
  ...registerEmployeeSlice.actions,
  getRegisterEmployee,
  getRegisterEmployeeById,
  addRegisterEmployee,
  updateRegisterEmployee,
  deleteRegisterEmployee,
}

export default registerEmployeeSlice.reducer
