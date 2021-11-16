type taskListsType = {
  taskLists?: gapi.client.tasks.TaskList[];
};

type tasksType = {
  tasks?: gapi.client.tasks.Task[];
};

type createTaskListType = {
  title?: string;
};

/**
 * tasklist内のタスク一覧を取得
 * @param {string} taskLists
 */
export const fetchTaskList = async (): Promise<taskListsType> => {
  const res: taskListsType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasklists
      .list({ maxResults: 10 })
      .then((response) => {
        resolve({ taskLists: response.result.items });
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
export const fetchTasks = async (taskListId: string): Promise<tasksType> => {
  const res: tasksType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasks
      .list({ tasklist: taskListId })
      .then((res) => {
        resolve({ tasks: res.result.items });
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
 * @param {string} taskList
 */
export const createTaskList = async (
  title: string
): Promise<createTaskListType> => {
  const res: createTaskListType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasklists
      .insert({ resource: { title } })
      .then((res) => {
        resolve({ title: res.result.title });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};
