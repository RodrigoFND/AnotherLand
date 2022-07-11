import { configureStore } from '@reduxjs/toolkit'

import registerEmployeeSlice from './register-employee-state/register-employee.reducer'
const store = configureStore({
  reducer: {
    registerEmployee: registerEmployeeSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
