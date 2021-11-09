//redux系書く
import React, { FC, useCallback } from 'react';
import { Top } from 'components/pages/Top';
import { useDispatch } from 'react-redux';
import { authorize, signIn, signOut } from '../slices/auth';
import { useSelector } from '../store';
import { selectIsSignedIn } from '../selectors/auth';
import {taskList} from "../slices/tasks";
import {selectTaskList} from "../selectors/tasks";

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
  const fetchTaskList = useCallback(
    () => {
      dispatch(taskList())
    },
    [dispatch],
  );
  const isSignedIn = useSelector(selectIsSignedIn);
  const tasklist = useSelector(selectTaskList);

  return (
    <Top
      isSignedIn={isSignedIn}
      taskList={tasklist}
      initialClient={initialClient}
      handleSignedIn={handleSignedIn}
      handleSignOut={handleSignOut}
      fetchTaskList={fetchTaskList}
    />
  );
};
