import React, {FC, useEffect, useState} from 'react';
import {Box, calc, Flex, SimpleGrid, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import { Header } from '../molecules/Header';
import {TaskCard} from '../atoms/TaskCard';

type Props = {
  googleAuthInstance?: gapi.auth2.GoogleAuth;
  isSignedIn: boolean;
  taskList?: gapi.client.tasks.TaskList[];
  tasks?: gapi.client.tasks.Tasks[];
  initialClient: () => void;
  handleSignedIn: () => void;
  handleSignOut: () => void;
  fetchTaskList: () => void;
  fetchTasks: () => void;
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
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const taskMock = ['hoge', 'hoge', 'hoge', 'hoge', 'hoge', 'hoge'];
  // const handleTabTap = (index) => {
  //   setTabIndex(index);
  // }

  useEffect(() => {
    if (!!googleAuthInstance) return;
    initialClient();
  }, [googleAuthInstance]);

  useEffect(() => {
    if (!!taskList || !isSignedIn) return;
    fetchTaskList();
  }, [isSignedIn, taskList]);

  // useEffect(() => {
  //   //最後尾タブを押した際にタスクリストの追加
  //   if (tabIndex === taskList?.length) fetchTasks();
  // }, [tabIndex]);

  useEffect(() => {
    if (!taskList && !!tasks) return;
  }, [tabIndex, taskList, tasks]);

  return (
    <Box>
      <Header
        isSignedIn={isSignedIn}
        onAuthorizationClick={isSignedIn ? handleSignOut : handleSignedIn}
      ></Header>
      <Box pt={16} px={16}>
        {!!taskList ? (
          <Tabs
            onChange={index => setTabIndex(index)}
            variant='enclosed'
          >
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
                      { !!taskMock &&
                        taskMock.map((content, index) => {
                          return(
                            <Box
                              key={index}
                              mb='2%'
                            >
                              <TaskCard
                                content='タスク内容'
                                title={item.title}
                                updatedTime={'2021-04-04'}
                              ></TaskCard>
                            </Box>
                          );
                        })
                      }
                    </TabPanel>
                  );
                })
              }
            </TabPanels>
          </Tabs>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
