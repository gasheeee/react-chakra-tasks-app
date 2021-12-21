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
  const [isEditableTask, setIsEditableTask] = useState(false);
  //更新するタスクカードIndex
  const [taskIndex, setTaskIndex] = useState(0);
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
    if (!!taskList && !!tabIndex && taskList.length === tabIndex) {
      console.log(8888);
    }
    if (
      !taskList ||
      taskList.length === tabIndex ||
      (!taskList[tabIndex].id && !tabIndex)
    )
      return;
    fetchTasks(taskList[tabIndex].id!!);
  }, [tabIndex]);

  useEffect(() => {
    if (taskStatus || !taskList || !taskList[tabIndex].id) return;
    fetchTasks(taskList[tabIndex].id!!);
  }, [taskStatus]);

  //タスク追加ボタン押下イベント
  const submitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id || (!newTitle && !newDescription))
      return;
    setNewTitle('');
    setNewDescription('');
    await createTask(taskList[tabIndex].id!!, {
      title: newTitle,
      notes: newDescription,
    });
  };
  //タスク更新ボタン押下イベント
  const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskList || !taskList[tabIndex].id || !tasks || !tasks[taskIndex].id) return;
    setTitle('');
    setDescription('');
    setIsEditableTask(false);
    await updatedTask(taskList[tabIndex].id!!, tasks[taskIndex].id!!, {
      id: tasks[taskIndex].id,
      title: title,
      notes: description,
    });
  };
  //キャンセルボタン押下イベント
  const cancelButtonTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setNewTitle('');
    setNewDescription('');
    setIsEditableTask(false);
  };
  //右上Menu内editボタン押下イベント
  const updatedButtonTap = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    title?: string,
    description?: string
  ) => {
    e.preventDefault();
    if (!!title) setTitle(title);
    if (!!description) setDescription(description);
    setTaskIndex(index);
    setIsEditableTask(true);
  };
  //右上Menu内deleteボタン押下イベント
  const deleteButtonTap = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
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
      <Box pt={[4, 4, 16, 16]} px={[4, 4, 16, 16]}>
        {!!taskList ? (
          <Tabs onChange={(index) => setTabIndex(index)} variant="enclosed">
            <Flex align="top" justify="space-between">
              <TabList
                flexGrow={1}
                mb={4}
                overflowY="hidden"
                sx={{
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {!!taskList &&
                  taskList.map((item, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <Tab _focus={{ boxShadow: 'none' }} flexShrink={0}>
                          {item.title}
                        </Tab>
                      </React.Fragment>
                    );
                  })}
                <Tab _focus={{ boxShadow: 'none' }} flexShrink={0}>
                  ＋新しいタスク
                </Tab>
              </TabList>
            </Flex>
            <TabPanels>
              {!!taskList &&
                taskList.map((taskListItem, idx) => {
                  return (
                    <TabPanel key={idx} px={0} pt={2}>
                      <Box mb={4}>
                        <AddTaskCard
                          title={newTitle}
                          description={newDescription}
                          submitButtonText={'add'}
                          setTitle={setNewTitle}
                          setDescription={setNewDescription}
                          submitButtonTap={submitTask}
                          cancelButtonTap={cancelButtonTap}
                        ></AddTaskCard>
                      </Box>
                      {!!tasks &&
                        tasks.map((content, index) => {
                          return (
                            <Box key={index} mb={4}>
                              {isEditableTask && taskIndex === index ? (
                                <>
                                  <AddTaskCard
                                    title={title}
                                    description={description}
                                    submitButtonText={'update'}
                                    setTitle={setTitle}
                                    setDescription={setDescription}
                                    submitButtonTap={updateTask}
                                    cancelButtonTap={cancelButtonTap}
                                  ></AddTaskCard>
                                </>
                              ) : (
                                <>
                                  <TaskCard
                                    content={content.notes}
                                    title={content.title}
                                    updatedButtonTap={(e) =>
                                      updatedButtonTap(
                                        e,
                                        index,
                                        content.title,
                                        content.notes
                                      )
                                    }
                                    deleteButtonTap={(e) =>
                                      deleteButtonTap(e, index)
                                    }
                                  ></TaskCard>
                                </>
                              )}
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
