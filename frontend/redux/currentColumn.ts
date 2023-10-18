import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define the initial state using that type
const initialState = {
	currentColumnIndex: 0,
  draggedTaskIndex: "0",
}

export const currentColumnSlice = createSlice({
  name: 'currentColumn',
  initialState,
  reducers: {
    setCurrentColumnIndex: (state, action: PayloadAction<number>) => {
      state.currentColumnIndex = action.payload
    },
    setDraggedTaskIndex: (state, action: PayloadAction<string>) => {
      state.draggedTaskIndex = action.payload
    }
  },
})

export const { setCurrentColumnIndex, setDraggedTaskIndex } = currentColumnSlice.actions
export const selectCurretColumnIndex = (state: RootState) => state.currentColumn.currentColumnIndex
export const selectDraggedTaskIndex = (state: RootState) => state.currentColumn.draggedTaskIndex
export default currentColumnSlice.reducer