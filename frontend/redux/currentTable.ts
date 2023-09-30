import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { TableType, ColumnType, TaskType } from '../types/Types'

// Define the initial state using that type
const initialState: TableType = {
	columns: [],
  title: "",
  users: [],
  __v: 0,
  _id: "",
};

export const currentTableSlice = createSlice({
  name: 'currentTable',
  initialState,
  reducers: {
    setCurrentTable: (state, action: PayloadAction<TableType>) => {
      state.columns = action.payload.columns
      state.title = action.payload.title
      state.users = action.payload.users
      state.__v = action.payload.__v
      state._id = action.payload._id
    },
    setColumns: (
      state,
      action: PayloadAction< ColumnType[]>
    ) => {
      state.columns = action.payload;
    },
    toggleCompletedTasksVisibility: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      state.columns = state.columns.map(column => {
        if (column._id === columnId) {
          return {
            ...column,
            showCompletedTasks: !column.showCompletedTasks
          };
        }
        return column;
      });
    },
    changeTaskStatus: (state, action: PayloadAction<{columnId: string, taskArray: string, taskId: string, newStatus: boolean}>) => {
      const {columnId, taskArray, taskId, newStatus} = action.payload;
      state.columns = state.columns.map(column => {
        if (column._id === columnId) {
          if (taskArray === 'pendingTasks') {
            column.pendingTasks.map((task, index) => {
              if (task._id === taskId) {
                const task = column.pendingTasks.splice(index, 1)[0]
                column.completedTasks.unshift({...task, completed: newStatus})
              } else return task
            })
          } else {
            column.completedTasks.map((task, index) => {
              if (task._id === taskId) {
                const task = column.completedTasks.splice(index, 1)[0]
                column.pendingTasks.unshift({...task, completed: newStatus})
              } else return task
            })
          }
          return column
        }
        return column;
      });
    },
  },
})

export const { 
  setCurrentTable,
  setColumns,
  toggleCompletedTasksVisibility,
  changeTaskStatus,
} = currentTableSlice.actions
export const selectCurrentTable = (state: RootState) => state.currentTable
export const selectColumns = (state: RootState) => state.currentTable.columns
export default currentTableSlice.reducer