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
} from '../api/tasks';
import { storage_v1 } from 'googleapis';

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

interface tasksParameterType {
  taskListId: string;
}

interface createTaskListType {
  completed: boolean;
}

interface createTaskListParameterType {
  title: string;
}

interface createTaskType {
  completed: boolean;
}

interface createTaskParameterType {
  tasklist: string;
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
  };
}

interface deleteTaskType {
  completed: boolean;
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
  createTaskListType,
  createTaskListParameterType
>('createTaskList', async ({ title }): Promise<createTaskListType> => {
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
  createTaskType,
  createTaskParameterType
>('createTask', async ({ tasklist, body: body }): Promise<createTaskType> => {
  if (!gapi) {
    throw new Error('gapi is not defined');
  }

  const res = await createTask(tasklist, body);
  return res;
});

// Delete Task
export const deletetask = createAsyncThunk<
  deleteTaskType,
  deleteTaskParameterType
>('deleteTask', async ({ tasklist, task }): Promise<deleteTaskType> => {
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
    builder.addCase(createtask.pending, (state, action) => {
      state.task.loading = true;
    });
    builder.addCase(createtask.fulfilled, (state, action) => {
      state.task.loading = !action.payload.completed;
    });
    builder.addCase(createtask.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(deletetask.pending, (state, action) => {
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
