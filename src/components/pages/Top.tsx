import React, { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '../molecules/Header';

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn: boolean;
  initialClient: () => void;
  handleSignedIn: () => void;
  handleSignOut: () => void;
};

export const Top: FC<Props> = (props: Props) => {
  const {
    googleAuthInstance,
    isSignedIn,
    initialClient,
    handleSignedIn,
    handleSignOut,
  } = props;

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance]);

  return (
    <Box>
      <Header
        isSignedIn={isSignedIn}
        onAuthorizationClick={isSignedIn ? handleSignOut : handleSignedIn}
      ></Header>
    </Box>
  );
};
