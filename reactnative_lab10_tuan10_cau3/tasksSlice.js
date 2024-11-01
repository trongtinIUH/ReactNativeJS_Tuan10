import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo các thunk để xử lý các tác vụ bất đồng bộ
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7');
  return response.json();
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
  const response = await fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  return response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await fetch(`https://66f606b5436827ced975b8c7.mockapi.io/bai7/${taskId}`, {
    method: 'DELETE',
  });
  return taskId; // Trả về ID của công việc đã xóa
});

// Tạo slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateTasks: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Xử lý addTask
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Xử lý deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const { updateTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
