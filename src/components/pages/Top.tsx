import React, { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '../molecules/Header';

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn?: boolean;
  taskList?: gapi.client.tasks.TaskList[]
  initialClient: () => void;
  handleSignedIn: () => void;
  handleSignOut: () => void;
  fetchTaskList: () => void;
};

export const Top: FC<Props> = (props: Props) => {
  const {
    googleAuthInstance,
    isSignedIn,
    taskList,
    initialClient,
    handleSignedIn,
    handleSignOut,
    fetchTaskList,
  } = props;

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance]);

  useEffect(() => {
    if (!!taskList || !isSignedIn) return;
    fetchTaskList();
  }, [isSignedIn, taskList]);

  return (
    <Box>
      <Header
        isSignedIn={isSignedIn}
        onAuthorizationClick={isSignedIn ? handleSignOut : handleSignedIn}
      ></Header>
    </Box>
  );
};
