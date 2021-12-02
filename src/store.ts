import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { authSlice } from './slices/auth';
import { tasksSlice } from './slices/tasks';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
