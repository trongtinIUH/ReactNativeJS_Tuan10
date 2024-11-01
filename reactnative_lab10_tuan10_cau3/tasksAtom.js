import { atom, selector } from 'recoil';

export const tasksState = atom({
  key: 'tasksState',
  default: [],
});

export const fetchTasksSelector = selector({
  key: 'fetchTasksSelector',
  get: async ({ get }) => {
    const response = await fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7');
    return await response.json();
  },
});
