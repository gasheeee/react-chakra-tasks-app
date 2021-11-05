import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';

import { authorization } from '../api/authorization';

export interface AuthState {
  isSignedIn?: boolean;
  error?: SerializedError;
}

const initialState: AuthState = {
  isSignedIn: undefined,
  error: undefined,
};

export interface authorizeType {
  isSignedIn?: boolean;
}

// Create Google Auth2 Instance & SignedIn
export const authorize = createAsyncThunk<authorizeType>(
  'authorize',
  async (): Promise<authorizeType> => {
    if (!gapi) {
      throw new Error('gapi is not defined');
    }

    const res = await authorization();
    return res;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorize.pending, (state, action) => {
      // noop
    });
    builder.addCase(authorize.fulfilled, (state, action) => {
      state.isSignedIn = action.payload.isSignedIn;
    });
    builder.addCase(authorize.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
