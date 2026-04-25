import type { TaskType } from '../../types';

export type ContextTasksType = {
  tasks: TaskType[];
  activeTasks: TaskType[];
  completedTasks: TaskType[];
  totalTasksCount: number;
  addTask: (newTask: TaskType) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTask: string) => void;
  toggleCompletedTask: (id: string) => void;
};

export type TasksState = {
  tasks: TaskType[];
};

export type TasksAction =
  | { type: 'tasks/add'; payload: TaskType }
  | { type: 'tasks/delete'; payload: string }
  | { type: 'tasks/edit'; payload: { id: string; newTask: string } }
  | { type: 'tasks/toggle'; payload: string };
