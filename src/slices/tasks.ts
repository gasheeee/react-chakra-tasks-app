import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import {tasklist} from "../api/tasks";

export interface tasksState {
  taskList?: gapi.client.tasks.TaskList[];
  error?: SerializedError;
};

const initialState: tasksState = {
  taskList: undefined,
  error: undefined,
};

export interface tasksType {
  taskList?: gapi.client.tasks.TaskList[]
};

// Fetch TaskList
export const taskList = createAsyncThunk<tasksType>(
  'taskList',
  async (): Promise<tasksType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await tasklist();
    return res;
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(taskList.pending, (state, action) => {
      // noop
    });
    builder.addCase(taskList.fulfilled, (state, action) => {
      state.taskList = action.payload.taskList;
    });
    builder.addCase(taskList.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
