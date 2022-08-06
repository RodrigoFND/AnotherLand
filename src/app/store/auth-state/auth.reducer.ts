import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import {
  EAuthenticationStatus,
  User,
  UserLogin,
} from '../../model/auth/auth.models'
import { ErrorAction, ErrorMessage } from '../../model/root/root-model'
import { UserService } from '../../services/auth-service/user.service'
import reducerErrorToast from '../../utils/reducer-error-toast/reducer-error-toast'
import { SpinnerPageLoaderAction } from '../spinner-page-loader-state/spinner-page-loader.reducer'

type AuthStateData = {
  user: User
  previousAuthentication: EAuthenticationStatus
  authentication: EAuthenticationStatus
  token?: string
}

const initialState: AuthStateData = {
  user: null,
  previousAuthentication: EAuthenticationStatus.NOTAUTHENTICATED,
  authentication: EAuthenticationStatus.NOTAUTHENTICATED,
  token: localStorage.getItem('token'),
}

const nameSpace = 'authstate'

const setAuthenticationState = (
  state: AuthStateData,
  authStatus: EAuthenticationStatus
) => {
  state.previousAuthentication = state.authentication
  state.authentication = authStatus
}

const loginWithPassword = createAsyncThunk<AuthStateData, UserLogin>(
  `${nameSpace}/loginWithPassword`,
  async (userData, thunkApi) => {
    try {
      thunkApi.dispatch(
        userSlice.actions.authenticateUser(EAuthenticationStatus.VERIFYING)
      )
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
      thunkApi.dispatch(
        userSlice.actions.authenticateUser(EAuthenticationStatus.VERIFYING)
      )
      const { data } = await UserService.userLoginWithToken(userData)
      return data
    } catch (err) {
      const error: ErrorAction = err as ErrorAction
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return thunkApi.rejectWithValue(error.response.data)
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
        state.token = payload.token
        localStorage.setItem('token', payload.token)
        setAuthenticationState(state, EAuthenticationStatus.AUTHENTICATED)
      }
    })
    .addCase(loginWithPassword.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('loginWithPassword - Reject ')
      console.log(action.payload)
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      setAuthenticationState(state, EAuthenticationStatus.NOTAUTHENTICATED)
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
        localStorage.setItem('token', payload.token)
        setAuthenticationState(state, EAuthenticationStatus.AUTHENTICATED)
      }
    })
    .addCase(loginWithToken.rejected, (state, action) => {
      reducerErrorToast(action.payload as ErrorMessage)
      console.log('loginWithTokenBuilder - Reject ')
      console.log(action.payload)
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      setAuthenticationState(state, EAuthenticationStatus.NOTAUTHENTICATED)
    })
}

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    authenticateUser(state, action) {
      if (!action.payload) {
        return
      }
      setAuthenticationState(state, action.payload)
    },
    expireUserAuth(state) {
      state.authentication = EAuthenticationStatus.NOTAUTHENTICATED
      state.previousAuthentication = EAuthenticationStatus.NOTAUTHENTICATED
      state.token = null
      localStorage.removeItem('token')
    },
    logout(state) {
      state.user = null
      state.authentication = EAuthenticationStatus.NOTAUTHENTICATED
      state.previousAuthentication = EAuthenticationStatus.NOTAUTHENTICATED
      state.token = null
      localStorage.removeItem('token')
    },
    clearAuthState(state) {
      state.user = null
      state.authentication = EAuthenticationStatus.NOTAUTHENTICATED
      state.previousAuthentication = EAuthenticationStatus.NOTAUTHENTICATED
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

const userSliceActions = {
  logout: userSlice.actions.logout,
  clearAuthState: userSlice.actions.clearAuthState,
  expireUserAuth: userSlice.actions.expireUserAuth,
}

export const AuthAction = {
  ...userSliceActions,
  loginWithPassword,
  loginWithToken,
}
