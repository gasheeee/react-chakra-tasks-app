import type { RootState } from '../store';
import { createSelector } from 'reselect';

export const authSelector = (state: RootState) => state.auth;

/**
 * isSignedInを取得する
 * @return isSignedIn
 */
export const isSignedInSelector = createSelector(authSelector, (auth) => {
  return auth.isSignedIn;
});

/**
 * errorを取得する
 * @returns error
 */
export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error;
});
