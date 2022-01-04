type taskListsType = {
  taskLists?: gapi.client.tasks.TaskList[];
};

type tasksType = {
  tasks?: gapi.client.tasks.Task[];
};

type completedApiType = {
  completed: boolean;
};

/**
 * tasklist内のタスク一覧を取得
 * @param {string} taskLists
 */
export const fetchTaskList = async (): Promise<taskListsType> => {
  const res: taskListsType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasklists
      .list({ maxResults: 10 })
      .then((res) => {
        resolve({ taskLists: res.result.items });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};

/**
 * tasks内のタスク一覧を取得
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
 * tasklist内にタスクを追加
 * @param {string} taskList
 */
export const createTaskList = async (
  title: string
): Promise<completedApiType> => {
  const res: completedApiType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasklists
      .insert({ resource: { title } })
      .then((res) => {
        resolve({ completed: !!res.result });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};

/**
 * tasks内にタスクを追加
 * @param {string} tasklist
 * @param {object} body
 */
export const createTask = async (
  tasklist: string,
  body: {
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Title of the task. */
    title?: string;
  }
): Promise<completedApiType> => {
  const res: completedApiType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasks
      .insert({ tasklist, resource: body })
      .then((res) => {
        resolve({ completed: !!res.result });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};

/**
 * tasklist内にタスクを更新
 * @param {string} tasklist
 * @param {string} task
 * @param {object} body
 */
export const updatedTask = async (
  tasklist: string,
  task: string,
  body: {
    /** Task identifier. */
    id?: string;
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Title of the task. */
    title?: string;
  }
): Promise<completedApiType> => {
  const res: completedApiType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasks
      .update({ tasklist: tasklist, task: task, resource: body })
      .then((res) => {
        resolve({ completed: !!res.result });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};

/**
 * task内のタスクを一件削除
 * @param {string} tasklist
 * @param {string} task
 */
export const deleteTask = async (
  tasklist: string,
  task: string
): Promise<completedApiType> => {
  const res: completedApiType = await new Promise(async (resolve, reject) => {
    await gapi.client.tasks.tasks
      .delete({ tasklist, task })
      .then(() => {
        resolve({ completed: true });
      })
      .catch((error) => {
        reject(error);
        throw new Error(error);
      });
  });
  return res;
};
