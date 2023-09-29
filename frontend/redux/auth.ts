import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define the initial state using that type
const initialState = {
	isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setIsLoggedIn } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.isLoggedIn
export default authSlice.reducer