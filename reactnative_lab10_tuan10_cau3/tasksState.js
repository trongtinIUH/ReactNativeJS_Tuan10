// tasksState.js
import { atom, selector, selectorFamily } from 'recoil';

// Atom lưu trữ danh sách công việc
export const tasksState = atom({
  key: 'tasksState',
  default: [],
});

// Selector để lấy danh sách công việc từ API
export const fetchTasksSelector = selector({
  key: 'fetchTasksSelector',
  get: async ({ get }) => {
    try {
      const response = await fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },
});

// Selector để thêm công việc
export const addTaskSelector = selectorFamily({
  key: 'addTaskSelector',
  get: () => async (newTask) => {
    try {
      const response = await fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
});

// Selector để cập nhật công việc
export const updateTaskSelector = selectorFamily({
  key: 'updateTaskSelector',
  get: () => async (updatedTask) => {
    try {
      const response = await fetch(`https://66f606b5436827ced975b8c7.mockapi.io/bai7/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },
});

// Selector để xóa công việc
export const deleteTaskSelector = selectorFamily({
  key: 'deleteTaskSelector',
  get: () => async (taskId) => {
    try {
      await fetch(`https://66f606b5436827ced975b8c7.mockapi.io/bai7/${taskId}`, {
        method: 'DELETE',
      });
      return taskId;
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },
});
