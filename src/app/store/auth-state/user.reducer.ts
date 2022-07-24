import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../model/auth/user.models'

type UserStateData = {
  user: User
}
const initialState: UserStateData = {
  user: null,
}

const nameSpace = 'user'

const userSlice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {},
  extraReducers: {},
})
export default userSlice.reducer
