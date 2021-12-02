//redux系書く
import React, { FC, useCallback } from 'react';
import { Top } from 'components/pages/Top';
import { useDispatch } from 'react-redux';
import { authorize, signIn, signOut } from '../slices/auth';
import { useSelector } from '../store';
import { selectIsSignedIn } from '../selectors/auth';
import {
  createtask,
  createtasklist,
  deletetask,
  taskList,
  tasks,
} from '../slices/tasks';
import {
  selectTaskList,
  selectTasks,
  selectTaskStatus,
} from '../selectors/tasks';

export const TopContainer: FC = () => {
  const dispatch = useDispatch();

  const isSignedIn = useSelector(selectIsSignedIn);
  const tasklist = useSelector(selectTaskList);
  const taskItem = useSelector(selectTasks);
  const taskStatus = useSelector(selectTaskStatus);
  const initialClient = useCallback(() => {
    dispatch(authorize());
  }, [dispatch]);
  const handleSignedIn = useCallback(() => {
    dispatch(signIn());
  }, [dispatch]);
  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);
  const fetchTaskList = useCallback(() => {
    dispatch(taskList());
  }, [dispatch]);
  const fetchTaskItem = useCallback(
    (taskListId: string) => {
      dispatch(tasks({ taskListId }));
    },
    [dispatch]
  );
  const createTaskList = useCallback(
    (title: string) => {
      dispatch(createtasklist({ title }));
    },
    [dispatch]
  );
  const createTask = useCallback(
    (tasklist: string, body: object) => {
      dispatch(createtask({ tasklist, body }));
    },
    [dispatch]
  );
  const deleteTask = useCallback(
    (tasklist: string, task: string) => {
      dispatch(deletetask({ tasklist, task }));
    },
    [dispatch]
  );

  return (
    <Top
      isSignedIn={isSignedIn}
      taskList={tasklist}
      tasks={taskItem}
      taskStatus={taskStatus}
      initialClient={initialClient}
      handleSignedIn={handleSignedIn}
      handleSignOut={handleSignOut}
      fetchTaskList={fetchTaskList}
      fetchTasks={fetchTaskItem}
      createTaskList={createTaskList}
      createTask={createTask}
      deleteTask={deleteTask}
    />
  );
};
