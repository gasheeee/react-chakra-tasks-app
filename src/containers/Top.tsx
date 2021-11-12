//redux系書く
import React, {FC, useCallback, useState} from 'react';
import { Top } from 'components/pages/Top';
import { useDispatch } from 'react-redux';
import { authorize, signIn, signOut } from '../slices/auth';
import { useSelector } from '../store';
import { selectIsSignedIn } from '../selectors/auth';
import { taskList, tasks } from '../slices/tasks';
import { selectTaskList, selectTasks } from '../selectors/tasks';

export const TopContainer: FC = () => {
  const dispatch = useDispatch();

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
  const fetchTaskItem = useCallback(() => {
    dispatch(tasks());
  }, [dispatch]);
  const isSignedIn = useSelector(selectIsSignedIn);
  const tasklist = useSelector(selectTaskList);
  const taskItem = useSelector(selectTasks);

  return (
    <Top
      isSignedIn={isSignedIn}
      taskList={tasklist}
      tasks={taskItem}
      initialClient={initialClient}
      handleSignedIn={handleSignedIn}
      handleSignOut={handleSignOut}
      fetchTaskList={fetchTaskList}
      fetchTasks={fetchTaskItem}
    />
  );
};
