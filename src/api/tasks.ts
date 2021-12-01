type taskListsType = {
  taskLists?: gapi.client.tasks.TaskList[];
};

type tasksType = {
  tasks?: gapi.client.tasks.Task[];
};

type createTaskListType = {
  completed: boolean;
};

type createTaskType = {
  completed: boolean;
};

type deleteTaskType = {
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
): Promise<createTaskListType> => {
  const res: createTaskListType = await new Promise(async (resolve, reject) => {
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
 * tasklist内にタスクを追加
 * @param {string} tasklist
 * @param {object} body
 */
export const createTask = async (
  tasklist: string,
  body: {
    /** Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed. */
    completed?: string;
    /** Flag indicating whether the task has been deleted. The default is False. */
    deleted?: boolean;
    /**
     * Due date of the task (as a RFC 3339 timestamp). Optional. The due date only records date information; the time portion of the timestamp is discarded when setting the due date. It
     * isn't possible to read or write the time that a task is due via the API.
     */
    due?: string;
    /** ETag of the resource. */
    etag?: string;
    /**
     * Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is
     * read-only.
     */
    hidden?: boolean;
    /** Task identifier. */
    id?: string;
    /** Type of the resource. This is always "tasks#task". */
    kind?: string;
    /** Collection of links. This collection is read-only. */
    links?: Array<{
      /** The description. In HTML speak: Everything between <a> and </a>. */
      description?: string;
      /** The URL. */
      link?: string;
      /** Type of the link, e.g. "email". */
      type?: string;
    }>;
    /** Notes describing the task. Optional. */
    notes?: string;
    /**
     * Parent task identifier. This field is omitted if it is a top-level task. This field is read-only. Use the "move" method to move the task under a different parent or to the top
     * level.
     */
    parent?: string;
    /**
     * String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task's corresponding
     * position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). This field is read-only. Use the
     * "move" method to move the task to another position.
     */
    position?: string;
    /** URL pointing to this task. Used to retrieve, update, or delete this task. */
    selfLink?: string;
    /** Status of the task. This is either "needsAction" or "completed". */
    status?: string;
    /** Title of the task. */
    title?: string;
    /** Last modification time of the task (as a RFC 3339 timestamp). */
    updated?: string;
  }
): Promise<createTaskType> => {
  const res: createTaskType = await new Promise(async (resolve, reject) => {
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
 * task内のタスクを一件削除
 * @param {string} tasklist
 * @param {string} task
 */
export const deleteTask = async (
  tasklist: string,
  task: string
): Promise<deleteTaskType> => {
  const res: deleteTaskType = await new Promise(async (resolve, reject) => {
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
