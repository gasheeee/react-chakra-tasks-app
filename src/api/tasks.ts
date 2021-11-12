type taskListType = {
  taskList?: gapi.client.tasks.TaskList[];
};

type tasksType = {
  tasks?: gapi.client.tasks.Task[];
};

type tasksParameterType = {
  tasks?: gapi.client.tasks.Task[];
};

export const fetchTasklist = async (): Promise<taskListType> => {
  const res: taskListType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasklists
      .list({ maxResults: 10 })
      .then((response) => {
        resolve({ taskList: response.result.items });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};

/**
 * tasklist内のタスク一覧を取得
 * @param {string} tasks
 */
export const fetchTasks = async (): Promise<tasksType> => {
  const res: tasksType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasks
      .list()
      .then((response) => {
        console.log(response);
        resolve({ tasks: response.result.items });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};