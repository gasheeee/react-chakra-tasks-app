import React, { FC, Ref, useEffect, useState } from 'react';
import {
  Box,
  chakra,
  Flex,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useStyles,
  useTab,
} from '@chakra-ui/react';
import { Header } from '../molecules/Header';
import { TaskCard } from '../atoms/TaskCard';
import { AddIcon } from '@chakra-ui/icons';

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn: boolean;
  taskList?: gapi.client.tasks.TaskList[];
  tasks?: gapi.client.tasks.Task[];
  initialClient: () => void;
  handleSignedIn: () => void;
  handleSignOut: () => void;
  fetchTaskList: () => void;
  fetchTasks: (taskListId: string) => void;
  createTaskList: (title: string) => void;
};

export const Top: FC<Props> = (props: Props) => {
  const {
    googleAuthInstance,
    isSignedIn,
    taskList,
    tasks,
    initialClient,
    handleSignedIn,
    handleSignOut,
    fetchTaskList,
    fetchTasks,
    createTaskList,//あとで使う予定です
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance]);

  useEffect(() => {
    if (!!taskList || !isSignedIn) return;
    fetchTaskList();
  }, [isSignedIn]);

  useEffect(() => {
    if (!taskList) return;
    fetchTasks(taskList[tabIndex].id);
  }, [taskList]);

  useEffect(() => {
    if (!taskList && !tabIndex && !tasks) return;
    fetchTasks(taskList[tabIndex].id);
  }, [tabIndex]);

  return (
    <Box>
      <Header
        isSignedIn={isSignedIn}
        onAuthorizationClick={isSignedIn ? handleSignOut : handleSignedIn}
      ></Header>
      <Box pt={16} px={16}>
        {!!taskList ? (
          <Tabs onChange={(index) => setTabIndex(index)} variant="enclosed">
            <Flex align="top" justify="space-between">
              <TabList flexGrow={1} mr={4}>
                {!!taskList &&
                  taskList.map((item, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <Tab _focus={{ boxShadow: 'none' }}>{item.title}</Tab>
                      </React.Fragment>
                    );
                  })}
              </TabList>
            </Flex>
            <Flex alignItems="center" justify="flex-end" mt={4} mr={4}>
              <IconButton aria-label="add task" icon={<AddIcon />}></IconButton>
            </Flex>
            <TabPanels>
              {!!taskList &&
                taskList.map((taskListItem, idx) => {
                  return (
                    <TabPanel key={idx} pl={0} pt={2}>
                      {!!tasks &&
                        tasks.map((content, index) => {
                          return (
                            <Box key={index} mb="2%">
                              <TaskCard
                                content={content.notes}
                                title={content.title}
                                updatedTime={content.due}
                              ></TaskCard>
                            </Box>
                          );
                        })}
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
