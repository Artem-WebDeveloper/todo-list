import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from './store';

const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectActiveTasks = createSelector(selectTasks, function (tasks) {
  return tasks.filter(task => !task.completed);
});

export const selectCompletedTasks = createSelector(selectTasks, function (tasks) {
  return tasks.filter(task => task.completed);
});

export const selectCountActiveTasks = createSelector(selectActiveTasks, function (tasks) {
  return tasks.length;
});

export const selectCountCompletedTasks = createSelector(selectCompletedTasks, function (tasks) {
  return tasks.length;
});

export const selectTotalTasksCount = (state: RootState) => state.tasks.tasks.length;

export const selectPercentage = createSelector(
  selectCountCompletedTasks,
  selectTotalTasksCount,
  function (completed, total) {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  },
);
