import { combineReducers } from '@reduxjs/toolkit';

import currentPage, { actions as currentPageActions, getCurrentPage } from './currentPage';
import totalPagesCount, { actions as totalPagesCountActions, getTotalPagesCount } from './totalPagesCount';
import users, { actions as usersActions, getUsers } from './users';
import usersAddingState, { actions as usersAddingStateActions, getUsersAddingState } from './usersAddingState';
import usersFetchingState, { actions as usersFetchingStateActions, getUsersFetchingState } from './usersFetchingState';

export default combineReducers({
  currentPage,
  totalPagesCount,
  users,
  usersAddingState,
  usersFetchingState,
});

const actions = {
  ...currentPageActions,
  ...totalPagesCountActions,
  ...usersActions,
  ...usersAddingStateActions,
  ...usersFetchingStateActions,
};

export { actions };

const selectors = {
  currentPage: getCurrentPage,
  totalPagesCount: getTotalPagesCount,
  users: getUsers,
  usersAddingState: getUsersAddingState,
  usersFetchingState: getUsersFetchingState,
};

const getSelector = (type) => selectors[type];

export { getSelector };
