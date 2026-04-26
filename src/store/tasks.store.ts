import { create } from 'zustand';
import type { TaskType } from '../types';
import { persist } from 'zustand/middleware';

export interface TasksState {
  tasks: TaskType[];
  add: (task: TaskType) => void;
  remove: (id: string) => void;
  toggleCompleted: (id: string) => void;
  edit: (id: string, newValue: string) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    set => ({
      tasks: [],

      add: task => set(state => ({ tasks: [...state.tasks, task] })),

      remove: id => set(state => ({ tasks: state.tasks.filter(task => task.id !== id) })),

      toggleCompleted: id =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),

      edit(id, newValue) {
        set(state => {
          return {
            tasks: state.tasks.map(task => {
              if (task.id === id) {
                return { ...task, task: newValue };
              }
              return task;
            }),
          };
        });
      },
    }),
    {
      name: 'tasks',
    },
  ),
);
