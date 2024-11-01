import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchTasksFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTaskRequest: (state) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    addTaskFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTasks: (state, action) => {
      state.items = action.payload;
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
    },
deleteTaskSuccess: (state, action) => {
  // Xóa công việc khỏi `items` dựa trên `id` từ payload
  state.items = state.items.filter(task => task.id !== action.payload);
  state.loading = false;
},
    deleteTaskFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTasks,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
