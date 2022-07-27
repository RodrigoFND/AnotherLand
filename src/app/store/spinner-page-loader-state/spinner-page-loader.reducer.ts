import { createSlice } from '@reduxjs/toolkit'

type SpinnerPageLoaderDataState = {
  isSpinning: boolean
  timesRequestedQueue: number
}

const initialState: SpinnerPageLoaderDataState = {
  isSpinning: false,
  timesRequestedQueue: 0,
}

const namespace = 'spinnerPageLoaderSlice'

const spinnerPageLoaderSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    loadSpinner(state) {
      state.timesRequestedQueue += 1
      state.isSpinning = true
    },
    removeSpinnerQueueTime(state) {
      state.timesRequestedQueue -= 1
      state.timesRequestedQueue =
        state.timesRequestedQueue < 0 ? 0 : state.timesRequestedQueue
      const isQueueFinished = state.timesRequestedQueue <= 0
      if (isQueueFinished) {
        state.isSpinning = false
      }
    },
  },
})
export default spinnerPageLoaderSlice.reducer

export const SpinnerPageLoaderAction = {
  ...spinnerPageLoaderSlice.actions,
}
