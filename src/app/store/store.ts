import { configureStore } from '@reduxjs/toolkit'
import userSlice from './auth-state/user.reducer'

import registerEmployeeSlice from './register-employee-state/register-employee.reducer'
const store = configureStore({
  reducer: {
    user: userSlice,
    registerEmployee: registerEmployeeSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
