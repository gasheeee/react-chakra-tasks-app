import type { RootState } from '../store';
import { createSelector } from 'reselect';

export const tasksSelector = (state: RootState) => state.tasks;

/**
 * 通信中かどうか判定する
 * @return loading
 */
export const selectTaskStatus = createSelector(tasksSelector, (tasks) => {
  return tasks.task.loading;
});

/**
 * taskListを取得する
 * @return taskList
 */
export const selectTaskList = createSelector(tasksSelector, (tasks) => {
  return tasks.taskLists;
});

/**
 * tasklist内のタスク一覧を取得する
 * @return tasks
 */
export const selectTasks = createSelector(tasksSelector, (tasks) => {
  return tasks.tasks;
});
