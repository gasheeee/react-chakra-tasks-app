import React, { FC, useEffect } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Header } from '../molecules/Header';

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn: boolean;
  taskList?: gapi.client.tasks.TaskList[];
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
      <Box pt={16} px={16}>
        {!!taskList ? (
          <Tabs variant="enclosed">
            <TabList>
              {!!taskList &&
                taskList.map((item, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <Tab>{item.title}</Tab>
                    </React.Fragment>
                  );
                })}
            </TabList>
            <TabPanels>
              {!!taskList &&
                taskList.map((item, idx) => {
                  return (
                    <TabPanel key={idx}>
                      <p>{item.title}</p>
                    </TabPanel>
                  );
                })}
            </TabPanels>
          </Tabs>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
