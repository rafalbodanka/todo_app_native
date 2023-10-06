import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { TableType, ColumnType, TaskType } from '../types/Types'
import tables from './tables';

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
      action: PayloadAction<ColumnType[]>
    ) => {
      state.columns = action.payload;
    },
    setColumnTitle: (
      state,
      action: PayloadAction<{columnId: string, newTitle: string}>
    ) => {
      const {columnId, newTitle} = action.payload;
      state.columns = state.columns.map(col => {
        if (col._id === columnId) {
          return {...col, title: newTitle}
        } else {
          return col
        }
      })
    },
    addTask: (
      state,
      action: PayloadAction<{tableId: string, columnId: string, taskTitle: string}>
    ) => {
      const {tableId, columnId, taskTitle} = action.payload;
      // const tasks = state.columns[columnId].pendingTasks
      // const newTask: TaskType = {
      //   _id: string;
      //   title: string;
      //   completed: boolean;
      //   column: string;
      //   notes: string;
      //   createdAt: string;
      //   updatedAt: string;
      //   responsibleUsers: User[];
      //   isEstimated: boolean;
      //   difficulty: number;
      //   // startDate and endDate for Redux purposes are
      //   // stored as strings in frontend app
      //   // because Date objects are non serializable
      //   startDate: string;
      //   endDate: string;
      // }
      // const newTasks = [...tasks, {
      // }]
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
  setColumnTitle,
  toggleCompletedTasksVisibility,
  changeTaskStatus,
} = currentTableSlice.actions
export const selectCurrentTable = (state: RootState) => state.currentTable
export const selectColumns = (state: RootState) => state.currentTable.columns
export default currentTableSlice.reducer