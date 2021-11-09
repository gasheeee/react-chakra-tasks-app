import type { RootState } from '../store';
import { createSelector } from 'reselect';

export const tasksSelector = (state: RootState) => state.tasks;

/**
 * taskListを取得する
 * @return taskList
 */
export const selectTaskList = createSelector(tasksSelector, (tasks) => {
  return tasks.taskList;
});
