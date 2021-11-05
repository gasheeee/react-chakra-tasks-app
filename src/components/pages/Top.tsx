import React, { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '../molecules/Header';
import type { SerializedError } from '@reduxjs/toolkit';

interface Props {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn?: boolean;
  initialClient: () => void;
  error?: SerializedError;
}

export const Top: FC<Props> = (props: Props) => {
  const { googleAuthInstance, isSignedIn, initialClient, error } = props;

  const handleSignedIn = () => {
    googleAuthInstance?.signIn();
  };

  const handleSignOut = () => {
    googleAuthInstance?.signOut();
  };

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance, isSignedIn]);

  return (
    <Box>
      <Header
        isSignedIn={isSignedIn}
        onAuthorizationClick={isSignedIn ? handleSignOut : handleSignedIn}
      ></Header>
    </Box>
  );
};
