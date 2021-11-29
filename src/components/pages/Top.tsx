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
import {AddTaskCard} from "../atoms/AddTaskCard";

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn: boolean;
  taskList?: gapi.client.tasks.TaskList[];
  tasks?: gapi.client.tasks.Task[];
  taskStatus: boolean;
  initialClient: () => void;
  handleSignedIn: () => void;
  handleSignOut: () => void;
  fetchTaskList: () => void;
  fetchTasks: (taskListId: string) => void;
  createTaskList: (title: string) => void;
  createTask: (tasklist: string, body: object) => void;
};

export const Top: FC<Props> = (props: Props) => {
  const {
    googleAuthInstance,
    isSignedIn,
    taskList,
    tasks,
    taskStatus,
    initialClient,
    handleSignedIn,
    handleSignOut,
    fetchTaskList,
    fetchTasks,
    createTaskList, //あとで使う予定です
    createTask,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  //タスクカード追加時要素
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTaskButtonTap = () => {};

  const submitNewTask = async (e) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex]?.id) return;
    await createTask(taskList[tabIndex].id, {
      title: title,
      notes: description
    });
  }

  useEffect(() => {
    if (taskStatus || !taskList || !taskList[tabIndex]?.id) return;
    fetchTasks(taskList[tabIndex].id);
  }, [taskStatus]);

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
    if (!taskList && !tabIndex) return;
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
              <IconButton aria-label="add task" icon={<AddIcon />} onClick={addTaskButtonTap}></IconButton>
            </Flex>
            <TabPanels>
              {!!taskList &&
                taskList.map((taskListItem, idx) => {
                  return (
                    <TabPanel key={idx} pl={0} pt={2}>
                      <AddTaskCard
                        setTitle={setTitle}
                        setDescription={setDescription}
                        submitNewTask={submitNewTask}
                      ></AddTaskCard>
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
