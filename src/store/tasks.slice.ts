import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TasksState, TaskType } from '../types';

function loadState() {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch {
    return [];
  }
}

const initialState: TasksState = {
  tasks: loadState(),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action: PayloadAction<TaskType>) {
      state.tasks = [...state.tasks, action.payload];
    },

    remove(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    edit(state, action: PayloadAction<{ id: string; taskValue: string }>) {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.task = action.payload.taskValue;
      }
    },

    toggleCompleted(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { add, remove, edit, toggleCompleted } = tasksSlice.actions;

export default tasksSlice.reducer;
