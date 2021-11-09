type taskListType = {
  taskList?: gapi.client.tasks.TaskList[];
};

export const tasklist = async (): Promise<taskListType> => {
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
