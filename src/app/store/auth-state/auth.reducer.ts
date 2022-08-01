import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { User, UserLogin } from '../../model/auth/auth.models'
import { ErrorMessage } from '../../model/root/root-model'
import { UserService } from '../../services/auth-service/user.service'
import { SpinnerPageLoaderAction } from '../spinner-page-loader-state/spinner-page-loader.reducer'

type AuthStateData = {
  user: User
  isAuthenticated: boolean
  token?: string
}
const initialState: AuthStateData = {
  user: null,
  isAuthenticated: false,
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
      const error: ErrorMessage = err as ErrorMessage
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      console.log('loginWithPassword - ' + error.response.data)
      return thunkApi.rejectWithValue(error.response.data?.message)
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
      const error: ErrorMessage = err as ErrorMessage
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      console.log('loginWithToken - ' + error.response.data)
      return thunkApi.rejectWithValue(error.response.data?.message)
    }
  }
)

const loginWithPasswordBuilder = (
  builder: ActionReducerMapBuilder<AuthStateData>
): ActionReducerMapBuilder<AuthStateData> => {
  return builder
    .addCase(loginWithPassword.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user
        state.isAuthenticated = true
        state.token = payload.token
        localStorage.setItem('token', payload.token)
      }
    })
    .addCase(loginWithPassword.rejected, (state, action) => {
      console.log('Toast' + action.payload)
      state.user = null
      state.isAuthenticated = false
      state.token = null
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
        state.isAuthenticated = true
        state.token = payload.token
        localStorage.setItem('token', payload.token)
      }
    })
    .addCase(loginWithToken.rejected, (state, action) => {
      console.log('Toast' + action.payload)
      state.user = null
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    })
}

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
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
  },
})

export default userSlice.reducer

export const AuthAction = {
  ...userSlice.actions,
  loginWithPassword,
  loginWithToken,
}
