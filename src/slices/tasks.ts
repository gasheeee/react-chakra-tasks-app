import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  createTask,
  createTaskList,
  deleteTask,
  fetchTaskList,
  fetchTasks,
  updatedTask,
} from '../api/tasks';

export interface tasksState {
  taskLists?: gapi.client.tasks.TaskList[];
  tasks?: gapi.client.tasks.Task[];
  task: { loading: boolean };
  error?: SerializedError;
}

const initialState: tasksState = {
  taskLists: undefined,
  tasks: undefined,
  task: { loading: false },
  error: undefined,
};

interface taskListsType {
  taskLists?: gapi.client.tasks.TaskList[];
}

interface taskListType {
  title?: string;
}

interface tasksType {
  tasks?: gapi.client.tasks.Task[];
}

interface completedApiType {
  completed: boolean;
}

interface tasksParameterType {
  taskListId: string;
}

interface createTaskListParameterType {
  title: string;
}

interface createTaskParameterType {
  tasklist: string;
  body: {
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Title of the task. */
    title?: string;
  };
}

interface updatedTaskParameterType {
  tasklist: string;
  task: string;
  body: {
    /** Task identifier. */
    id?: string;
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Title of the task. */
    title?: string;
  };
}

interface deleteTaskParameterType {
  tasklist: string;
  task: string;
}

// Fetch TaskList
export const taskList = createAsyncThunk<taskListsType>(
  'taskLists',
  async (): Promise<taskListsType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await fetchTaskList();
    return res;
  }
);

// Create TaskList
export const createtasklist = createAsyncThunk<
  completedApiType,
  createTaskListParameterType
>('createTaskList', async ({ title }): Promise<completedApiType> => {
  if (!gapi) {
    throw new Error('gapi is not defined');
  }

  const res = await createTaskList(title);
  return res;
});

// Fetch Tasks
export const tasks = createAsyncThunk<tasksType, tasksParameterType>(
  'tasks',
  async ({ taskListId }): Promise<tasksType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await fetchTasks(taskListId);
    return res;
  }
);

// Create Task
export const createtask = createAsyncThunk<
  completedApiType,
  createTaskParameterType
>('createTask', async ({ tasklist, body }): Promise<completedApiType> => {
  if (!gapi) {
    throw new Error('gapi is not defined');
  }

  const res = await createTask(tasklist, body);
  return res;
});

// Updated Task
export const updatedtask = createAsyncThunk<
  completedApiType,
  updatedTaskParameterType
>(
  'updatedTask',
  async ({ tasklist, task, body }): Promise<completedApiType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await updatedTask(tasklist, task, body);
    return res;
  }
);

// Delete Task
export const deletetask = createAsyncThunk<
  completedApiType,
  deleteTaskParameterType
>('deleteTask', async ({ tasklist, task }): Promise<completedApiType> => {
  if (!gapi) {
    throw new Error('gapi is not defined');
  }

  const res = await deleteTask(tasklist, task);
  return res;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(taskList.fulfilled, (state, action) => {
      state.taskLists = action.payload.taskLists;
    });
    builder.addCase(taskList.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(tasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
    });
    builder.addCase(tasks.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(createtask.pending, (state) => {
      state.task.loading = true;
    });
    builder.addCase(createtask.fulfilled, (state, action) => {
      state.task.loading = !action.payload.completed;
    });
    builder.addCase(createtask.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(updatedtask.pending, (state) => {
      state.task.loading = true;
    });
    builder.addCase(updatedtask.fulfilled, (state, action) => {
      state.task.loading = !action.payload.completed;
    });
    builder.addCase(updatedtask.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(deletetask.pending, (state) => {
      state.task.loading = true;
    });
    builder.addCase(deletetask.fulfilled, (state, action) => {
      state.task.loading = !action.payload.completed;
    });
    builder.addCase(deletetask.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
