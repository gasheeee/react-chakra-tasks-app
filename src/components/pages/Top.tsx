import React, { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '../molecules/Header';
import type { SerializedError } from '@reduxjs/toolkit';

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn?: boolean;
  initialClient: () => void;
  handleSignedIn: () => void;
  handleSignOut: () => void;
  error?: SerializedError;
};

export const Top: FC<Props> = (props: Props) => {
  const {
    googleAuthInstance,
    isSignedIn,
    initialClient,
    handleSignedIn,
    handleSignOut,
    error,
  } = props;

  const signedIn = () => {
    handleSignedIn();
  };

  const signOut = () => {
    handleSignOut();
  };

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance]);

  return (
    <Box>
      <Header
        isSignedIn={isSignedIn}
        onAuthorizationClick={isSignedIn ? signOut : signedIn}
      ></Header>
    </Box>
  );
};
