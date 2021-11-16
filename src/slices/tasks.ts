import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { createTaskList, fetchTaskList, fetchTasks } from '../api/tasks';

export interface tasksState {
  taskLists?: gapi.client.tasks.TaskList[];
  tasks?: gapi.client.tasks.Task[];
  error?: SerializedError;
}

const initialState: tasksState = {
  taskLists: undefined,
  tasks: undefined,
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

interface tasksParameterType {
  taskListId: string;
}

interface createTaskListParameterType {
  title: string;
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

// Create TaskList
export const createtasklist = createAsyncThunk<
  taskListType,
  createTaskListParameterType
>('createTaskList', async ({ title }): Promise<taskListType> => {
  if (!gapi) {
    throw new Error('gapi is not defined');
  }

  const res = await createTaskList(title);
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
    builder.addCase(createtasklist.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
