import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { fetchTasklist, fetchTasks } from '../api/tasks';

export interface tasksState {
  taskList?: gapi.client.tasks.TaskList[];
  tasks?: gapi.client.tasks.Task[];
  error?: SerializedError;
}

const initialState: tasksState = {
  taskList: undefined,
  tasks: undefined,
  error: undefined,
};

export interface taskListType {
  taskList?: gapi.client.tasks.TaskList[];
}

export interface tasksType {
  tasks?: gapi.client.tasks.Task[];
}

interface tasksParameterType {}

// Fetch TaskList
export const taskList = createAsyncThunk<taskListType>(
  'taskList',
  async (): Promise<taskListType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await fetchTasklist();
    return res;
  }
);

// Fetch Tasks
export const tasks = createAsyncThunk<tasksType>(
  'tasks',
  async (): Promise<tasksType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await fetchTasks();
    return res;
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(taskList.fulfilled, (state, action) => {
      state.taskList = action.payload.taskList;
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
  },
});
