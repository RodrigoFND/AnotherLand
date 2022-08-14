import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { User, UserLogin } from '../../model/auth/auth.models'
import { ErrorAction, ErrorMessage } from '../../model/root/root-model'
import { UserService } from '../../services/auth-service/user.service'
import reducerErrorToast from '../../utils/reducer-error-toast/reducer-error-toast'
import { SpinnerPageLoaderAction } from '../spinner-page-loader-state/spinner-page-loader.reducer'

type AuthStateData = {
  user: User
  isAuthenticated: boolean
  token?: string
}

const initialState: AuthStateData = {
  user: null,
  isAuthenticated: null,
  token: localStorage.getItem('token'),
}

const nameSpace = 'authstate'

const loginWithPassword = createAsyncThunk<AuthStateData, UserLogin>(
  `${nameSpace}/loginWithPassword`,
  async (userData, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } = await UserService.userLoginWithPassword(userData)
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const loginWithToken = createAsyncThunk<AuthStateData, UserLogin>(
  `${nameSpace}/loginWithToken`,
  async (userData, thunkApi) => {
    try {
      const { data } = await UserService.userLoginWithToken(userData)
      return data
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const forgotPassword = createAsyncThunk<AuthStateData, string>(
  `${nameSpace}/forgotPassword`,
  async (email, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const { data } = await UserService.userForgotPassword(email)
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return data
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const resetPassword = createAsyncThunk<
  AuthStateData,
  { tokenId: number; password: string }
>(`${nameSpace}/resetPassword`, async (passwordData, thunkApi) => {
  try {
    thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
    const { data } = await UserService.userResetPassword(
      passwordData.tokenId,
      passwordData.password
    )
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return data
  } catch (err) {
    const error: ErrorAction = err as ErrorAction
    thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
    return thunkApi.rejectWithValue(error.response.data)
  }
})

const loginWithPasswordBuilder = (
  builder: ActionReducerMapBuilder<AuthStateData>
): ActionReducerMapBuilder<AuthStateData> => {
  return builder
    .addCase(loginWithPassword.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user
        state.token = payload.token
        localStorage.setItem('token', payload.token)
        state.isAuthenticated = true
      }
    })
    .addCase(loginWithPassword.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('loginWithPassword - Reject ')
      console.log(action.payload)
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    })
}

const loginWithTokenBuilder = (
  builder: ActionReducerMapBuilder<AuthStateData>
): ActionReducerMapBuilder<AuthStateData> => {
  return builder
    .addCase(loginWithToken.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user
        state.token = payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', payload.token)
      }
    })
    .addCase(loginWithToken.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('loginWithTokenBuilder - Reject ')
      console.log(action.payload)
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    })
}

const ForgotPasswordTokenBuilder = (
  builder: ActionReducerMapBuilder<AuthStateData>
): ActionReducerMapBuilder<AuthStateData> => {
  return builder
    .addCase(forgotPassword.fulfilled, (state, { payload }) => {
      if (payload) {
      }
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('ForgotPasswordTokenBuilder - Reject ')
      console.log(action.payload)
    })
}

const ResetPasswordBuilder = (
  builder: ActionReducerMapBuilder<AuthStateData>
): ActionReducerMapBuilder<AuthStateData> => {
  return builder
    .addCase(resetPassword.fulfilled, (state, { payload }) => {
      if (payload) {
      }
    })
    .addCase(resetPassword.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('ResetPasswordBuilder - Reject ')
      console.log(action.payload)
    })
}

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    expireUserAuth(state) {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },
    clearAuthState(state) {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    loginWithPasswordBuilder(builder)
    loginWithTokenBuilder(builder)
    ForgotPasswordTokenBuilder(builder)
    ResetPasswordBuilder(builder)
  },
})

export default userSlice.reducer

export const AuthAction = {
  ...userSlice.actions,
  loginWithPassword,
  loginWithToken,
  forgotPassword,
  resetPassword,
}
