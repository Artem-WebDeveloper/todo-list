import { createSelector } from 'reselect';
import type { TasksState } from './tasks.store';

const selectTasks = (state: TasksState) => state.tasks;
export const selectActiveTasks = createSelector(selectTasks, tasks =>
  tasks.filter(task => !task.completed),
);

export const selectCompletedTasks = createSelector(selectTasks, tasks =>
  tasks.filter(task => task.completed),
);

export const selectActiveTasksCount = createSelector(selectActiveTasks, tasks => tasks.length);
export const selectCompletedTasksCount = createSelector(
  selectCompletedTasks,
  tasks => tasks.length,
);
export const selectTotalTasksCount = (state: TasksState) => state.tasks.length;

export const selectPercentage = createSelector(
  selectCompletedTasksCount,
  selectTotalTasksCount,
  (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  },
);
