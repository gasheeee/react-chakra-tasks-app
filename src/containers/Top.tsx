//redux系書く
import React, { FC, useCallback } from 'react';
import { Top } from 'components/pages/Top';
import { useDispatch } from 'react-redux';
import { authorize, signIn, signOut } from '../slices/auth';
import { useSelector } from '../store';
import { selectIsSignedIn } from '../selectors/auth';

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
  const isSignedIn = useSelector(selectIsSignedIn);

  return (
    <Top
      isSignedIn={isSignedIn}
      initialClient={initialClient}
      handleSignedIn={handleSignedIn}
      handleSignOut={handleSignOut}
    />
  );
};
