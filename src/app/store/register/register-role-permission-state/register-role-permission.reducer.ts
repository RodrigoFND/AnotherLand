import {
  createAsyncThunk,
  createSlice,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { MRegisterRolePermission } from '../../../model/Register/register-role-permission/register-role-permission.model'
import { ErrorAction, ErrorMessage } from '../../../model/root/root-model'
import { RegisterRolePermissionService } from '../../../services/role-permission/role-permission-service'
import { toastMessage } from '../../../shared/components/toast/toast.component'
import reducerErrorToast from '../../../utils/reducer-error-toast/reducer-error-toast'
import { SpinnerPageLoaderAction } from '../../spinner-page-loader-state/spinner-page-loader.reducer'

type RegisterRolePermissionDataState = {
  rolesPermission: MRegisterRolePermission[]
  rolePermission: MRegisterRolePermission
}

const initialState: RegisterRolePermissionDataState = {
  rolesPermission: [],
  rolePermission: null,
}

const namespace = 'registerRolePermissionSlice'

const getRegisterRolePermission = createAsyncThunk<
  MRegisterRolePermission[],
  string
>(`${namespace}/getRegisterRolePermission`, async (payload, thunkApi) => {
  try {
    const query = !payload ? '' : payload
    thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
    const { data } =
      await RegisterRolePermissionService.GetRegisterRolePermission(query)
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return data as MRegisterRolePermission[]
  } catch (err) {
    const error: ErrorAction = err as ErrorAction
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return thunkApi.rejectWithValue(error.response.data)
  }
})

const getRegisterRolePermissionBuilder = (
  builder: ActionReducerMapBuilder<RegisterRolePermissionDataState>
): ActionReducerMapBuilder<RegisterRolePermissionDataState> => {
  return builder
    .addCase(getRegisterRolePermission.fulfilled, (state, { payload }) => {
      if (payload) {
        state.rolesPermission = payload
      }
    })
    .addCase(getRegisterRolePermission.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('getRegisterRolePermission - Reject ')
      console.log(action.payload)
    })
}

const getRegisterRolePermissionById = createAsyncThunk<
  MRegisterRolePermission,
  string
>(
  `${namespace}/getRegisterRolePermissionById`,
  async (permissionId, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } =
        await RegisterRolePermissionService.GetRegisterRolePermissionById(
          permissionId
        )
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const getRegisterRolePermissionBuilderById = (
  builder: ActionReducerMapBuilder<RegisterRolePermissionDataState>
): ActionReducerMapBuilder<RegisterRolePermissionDataState> => {
  return builder
    .addCase(getRegisterRolePermissionById.fulfilled, (state, { payload }) => {
      if (payload) {
        state.rolePermission = payload
      }
    })
    .addCase(getRegisterRolePermissionById.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('getRegisterRolePermissionById - Reject ')
      console.log(action.payload)
    })
}

const addRegisterRolePermission = createAsyncThunk<
  MRegisterRolePermission,
  MRegisterRolePermission
>(
  `${namespace}/addRegisterRolePermission`,
  async (rolePermission, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } =
        await RegisterRolePermissionService.AddRegisterRolePermission(
          rolePermission
        )
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data as MRegisterRolePermission
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const addRegisterRolePermissionBuilder = (
  builder: ActionReducerMapBuilder<RegisterRolePermissionDataState>
): ActionReducerMapBuilder<RegisterRolePermissionDataState> => {
  return builder
    .addCase(addRegisterRolePermission.fulfilled, (state, action) => {
      toastMessage.toastSuccess('Role permission registered successfully')
      state.rolesPermission.push(action.payload)
    })
    .addCase(addRegisterRolePermission.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('addRegisterRolePermission - Reject ')
      console.log(action.payload)
    })
}

const updateRegisterRolePermission = createAsyncThunk<
  MRegisterRolePermission,
  MRegisterRolePermission
>(
  `${namespace}/updateRegisterRolePermission`,
  async (rolePermission, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } =
        await RegisterRolePermissionService.UpdateRegisterRolePermission(
          rolePermission
        )
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data as MRegisterRolePermission
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const updateRegisterRolePermissionBuilder = (
  builder: ActionReducerMapBuilder<RegisterRolePermissionDataState>
): ActionReducerMapBuilder<RegisterRolePermissionDataState> => {
  return builder
    .addCase(updateRegisterRolePermission.fulfilled, () => {
      toastMessage.toastSuccess('Role permission updated successfully')
    })
    .addCase(updateRegisterRolePermission.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('updateRegisterRolePermissionBuilder - Reject ')
      console.log(action.payload)
    })
}

const deleteRegisterRolePermission = createAsyncThunk<number, number>(
  `${namespace}/deleteRegisterRolePermission`,
  async (roleId, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      await RegisterRolePermissionService.DeleteRegisterRolePermission(roleId)
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return roleId
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const deleteRegisterRolePermissionBuilder = (
  builder: ActionReducerMapBuilder<RegisterRolePermissionDataState>
): ActionReducerMapBuilder<RegisterRolePermissionDataState> => {
  return builder
    .addCase(deleteRegisterRolePermission.fulfilled, (state, { payload }) => {
      toastMessage.toastSuccess('Register permission deleted successfully')
      state.rolesPermission = state.rolesPermission.filter(
        (role) => role.id != payload
      )
    })
    .addCase(deleteRegisterRolePermission.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('deleteRegisterRolePermission - Reject ')
      console.log(action.payload)
    })
}

const registerRolePermissionSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getRegisterRolePermissionBuilder(builder)
    getRegisterRolePermissionBuilderById(builder)
    addRegisterRolePermissionBuilder(builder)
    updateRegisterRolePermissionBuilder(builder)
    deleteRegisterRolePermissionBuilder(builder)
  },
})

export const RegisterRolePermissionAction = {
  ...registerRolePermissionSlice.actions,
  getRegisterRolePermission,
  getRegisterRolePermissionById,
  addRegisterRolePermission,
  updateRegisterRolePermission,
  deleteRegisterRolePermission,
}

export default registerRolePermissionSlice.reducer
