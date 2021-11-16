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
    createTaskList,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const StyledTab = chakra('button', { label: 'Tabs.Tab' });
  const AddNewTaskTab = React.forwardRef((props, ref) => {
    const tabProps = useTab({
      ...props,
      ref: ref as Ref<HTMLElement>,
      onClick: addNewTaskTabClick,
    });
    const styles = useStyles();

    return (
      <StyledTab __css={styles.tab} {...tabProps}>
        {'＋新しいタスク'}
      </StyledTab>
    );
  });

  const addNewTaskTabClick = () => {
    return (
      <>
        <Tab>
          <form onSubmit={submitNewTask}>
            <Input onChange={taskTitleChange} variant="Outline" />
          </form>
        </Tab>
      </>
    );
  };
  const [taskTitle, setTaskTitle] = useState('');
  const taskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(() => event.currentTarget.value);
  };
  const submitNewTask = () => {
    if (!taskTitle) return;
    createTaskList(taskTitle);
  };

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
                <AddNewTaskTab></AddNewTaskTab>
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
