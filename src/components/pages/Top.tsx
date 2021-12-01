import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Header } from '../molecules/Header';
import { TaskCard } from '../atoms/TaskCard';
import { AddIcon } from '@chakra-ui/icons';
import { AddTaskCard } from '../atoms/AddTaskCard';

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
  deleteTask: (tasklist: string, task: string) => void;
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
    deleteTask,
  } = props;

  //選択されているタブ
  const [tabIndex, setTabIndex] = useState(0);
  //追加するタスクカードのタイトル
  const [title, setTitle] = useState('');
  //追加するタスクカードの内容
  const [description, setDescription] = useState('');

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

  useEffect(() => {
    if (taskStatus || !taskList || !taskList[tabIndex].id) return;
    fetchTasks(taskList[tabIndex].id);
  }, [taskStatus]);

  const addTaskButtonTap = () => {};
  //タスク追加ボタン押下イベント
  const submitNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id) return;
    await createTask(taskList[tabIndex].id, {
      title: title,
      notes: description,
    });
  };
  //タスク削除ボタン押下イベント
  const deleteButtonTap = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id || !tasks) return;
    await deleteTask(taskList[tabIndex].id, tasks[index].id);
  };

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
              <IconButton
                aria-label="add task"
                icon={<AddIcon />}
                onClick={addTaskButtonTap}
              ></IconButton>
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
                                deleteTask={(e) => deleteButtonTap(index, e)}
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
