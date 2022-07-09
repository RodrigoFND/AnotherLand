import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  numOfCkes: number
}

const initialState: InitialState = {
  numOfCkes: 0,
}

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCkes--
    },
    restocked: (state, action: PayloadAction<number>) => {
      state.numOfCkes += action.payload
    },
  },
})

export default cakeSlice.reducer
export const { ordered, restocked } = cakeSlice.actions
