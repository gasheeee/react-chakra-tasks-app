import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Header } from '../molecules/Header';
import { TaskCard } from '../molecules/TaskCard';
import { AddTaskCard } from '../molecules/AddTaskCard';

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
  updatedTask: (tasklist: string, task: string, body: object) => void;
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
    updatedTask,
    deleteTask,
  } = props;

  //選択されているタブ
  const [tabIndex, setTabIndex] = useState(0);
  //タスクカードが更新できるか
  const [isEdit, setIsEdit] = useState(false);
  //更新するタスクカードのタイトル
  const [title, setTitle] = useState('');
  //更新するタスクカードの内容
  const [description, setDescription] = useState('');
  //追加する新規タスクカードのタイトル
  const [newTitle, setNewTitle] = useState('');
  //追加する新規タスクカードの内容
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance]);

  useEffect(() => {
    if (!!taskList || !isSignedIn) return;
    fetchTaskList();
  }, [isSignedIn]);

  useEffect(() => {
    if (!taskList || !taskList[tabIndex].id) return;
    fetchTasks(taskList[tabIndex].id!!);
  }, [taskList]);

  useEffect(() => {
    if (!taskList || (!taskList[tabIndex].id && !tabIndex)) return;
    fetchTasks(taskList[tabIndex].id!!);
  }, [tabIndex]);

  useEffect(() => {
    if (taskStatus || !taskList || !taskList[tabIndex].id) return;
    fetchTasks(taskList[tabIndex].id!!);
  }, [taskStatus]);

  //タスク追加ボタン押下イベント
  const submitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id) return;
    setNewTitle('');
    setNewDescription('');
    await createTask(taskList[tabIndex].id!!, {
      title: newTitle,
      notes: newDescription,
    });
  };
  //キャンセルボタン押下イベント
  const cancelButtonTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setNewTitle('');
    setNewDescription('');
  };
  //タスク更新ボタン押下イベント
  const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id) return;
    setTitle('');
    setDescription('');
    await updatedTask(taskList[tabIndex].id!!, tasks[0].id!!, {
      title: title,
      notes: description,
    });
  };
  //右上Menu内のタスク更新ボタン押下イベント
  const updatedButtonTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  //右上Menu内のタスク削除ボタン押下イベント
  const deleteButtonTap = async (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id || !tasks) return;
    await deleteTask(taskList[tabIndex].id!!, tasks[index].id!!);
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
              <TabList flexGrow={1} mr={4} mb={4}>
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
            {/*<Flex alignItems="center" justify="flex-end" mt={4} mr={4}>*/}
            {/*  <IconButton*/}
            {/*    aria-label="add task"*/}
            {/*    icon={<AddIcon />}*/}
            {/*    onClick={addTaskButtonTap}*/}
            {/*  ></IconButton>*/}
            {/*</Flex>*/}
            <TabPanels>
              {!!taskList &&
                taskList.map((taskListItem, idx) => {
                  return (
                    <TabPanel key={idx} pl={0} pt={2}>
                      <Box mb={4}>
                        <AddTaskCard
                          newTitle={newTitle}
                          newDescription={newDescription}
                          setNewTitle={setNewTitle}
                          setNewDescription={setNewDescription}
                          submitNewTask={submitTask}
                          cancelButtonTap={cancelButtonTap}
                        ></AddTaskCard>
                      </Box>
                      {!!tasks &&
                        tasks.map((content, index) => {
                          return (
                            <Box key={index} mb={4}>
                              <TaskCard
                                content={content.notes}
                                title={content.title}
                                setTitle={setTitle}
                                setDescription={setDescription}
                                updateTask={updateTask}
                                updatedButtonTap={(e) => updatedButtonTap(e)}
                                cancelButtonTap={cancelButtonTap}
                                deleteButtonTap={(e) =>
                                  deleteButtonTap(index, e)
                                }
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
