import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-state/auth.reducer'
import registerEmployeeSlice from './register/register-employee-state/register-employee.reducer'
import spinnerPageLoaderSlice from './spinner-page-loader-state/spinner-page-loader.reducer'

const store = configureStore({
  reducer: {
    auth: authSlice,
    registerEmployee: registerEmployeeSlice,
    spinnerPageLoader: spinnerPageLoaderSlice,
  },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
