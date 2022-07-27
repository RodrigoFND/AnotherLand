import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { User, UserLogin } from '../../model/auth/user.models'
import { API_URL } from '../../services/service'
import { SpinnerPageLoaderAction } from '../spinner-page-loader-state/spinner-page-loader.reducer'

type UserStateData = {
  user: User
  isAuthenticated: boolean
}
const initialState: UserStateData = {
  user: { id: 1, description: 'Rodrigo', password: '123', token: 'number' },
  isAuthenticated: true,
}

const nameSpace = 'user'

const login = createAsyncThunk<User, UserLogin>(
  `${nameSpace}/login`,
  async (userData, thunkApi) => {
    try {
      thunkApi.dispatch(SpinnerPageLoaderAction.loadSpinner())
      const body = JSON.stringify(userData)
      const res: Response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      })
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      if (res.ok) {
        return res.json()
      }
      if (!res.ok) {
        res.json().then((err) => console.log(err))
        return null
      }
    } catch (err) {
      thunkApi.dispatch(SpinnerPageLoaderAction.removeSpinnerQueueTime())
      return null
    }
  }
)

const loginBuilder = (
  builder: ActionReducerMapBuilder<UserStateData>
): ActionReducerMapBuilder<UserStateData> => {
  return builder
    .addCase(login.fulfilled, (state, { payload }) => {
      console.log('fulfied')
      if (payload) {
        state.user = payload
        state.isAuthenticated = true
      }
    })
    .addCase(login.pending, () => {
      console.log('Pending')
    })
    .addCase(login.rejected, (state, action) => {
      console.log('Rejected')
      console.log(action.error)
    })
}

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
  extraReducers: (builder) => {
    loginBuilder(builder)
  },
})
export default userSlice.reducer

export const userAction = {
  ...userSlice.actions,
  login,
}
