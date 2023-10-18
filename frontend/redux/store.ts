import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth';
import userReducer from './user';
import tablesReducer from './tables'
import currentTableReducer from './currentTable';
import currentColumnReducer from './currentColumn'

export const store = configureStore({
  reducer: {
		auth: authReducer,
		user: userReducer,
    tables: tablesReducer,
    currentTable: currentTableReducer,
    currentColumn: currentColumnReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch