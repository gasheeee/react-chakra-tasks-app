import type { RootState } from '../store';
import { createSelector } from 'reselect';

export const selectAuth = (state: RootState) => state.auth;

/**
 * isSignedInを取得する
 * @return isSignedIn
 */
export const selectIsSignedIn = createSelector(selectAuth, (auth) => {
  return auth.isSignedIn;
});
