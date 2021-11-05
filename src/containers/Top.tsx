//redux系書く
import React, { FC, useCallback } from 'react';
import { Top } from 'components/pages/Top';
import { useDispatch } from 'react-redux';
import { authorize } from '../slices/auth';
import { useSelector } from '../store';
import { errorSelector, isSignedInSelector } from '../selectors/auth';

export const TopContainer: FC = () => {
  const dispatch = useDispatch();
  const initialClient = useCallback(() => {
    dispatch(authorize());
  }, [dispatch]);
  const isSignedIn = useSelector(isSignedInSelector);
  const error = useSelector(errorSelector);

  return (
    <>
      <Top
        isSignedIn={isSignedIn}
        initialClient={initialClient}
        error={error}
      />
    </>
  );
};
