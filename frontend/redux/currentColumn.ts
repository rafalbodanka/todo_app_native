import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define the initial state using that type
const initialState = {
	currentColumnIndex: 0
}

export const currentColumnSlice = createSlice({
  name: 'currentColumn',
  initialState,
  reducers: {
    setCurrentColumnIndex: (state, action: PayloadAction<number>) => {
      state.currentColumnIndex = action.payload
    },
  },
})

export const { setCurrentColumnIndex } = currentColumnSlice.actions
export const selectCurretColumnIndex = (state: RootState) => state.currentColumn.currentColumnIndex
export default currentColumnSlice.reducer