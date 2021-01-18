import axios from 'axios';
import get from 'lodash/get';
import { createSlice } from '@reduxjs/toolkit';
import { actions as usersActions } from './users';
import { actions as currentPageActions } from './currentPage';

const usersAddingState = createSlice({
  name: 'usersAddingState',
  initialState: 'idle',
  reducers: {
    usersAddingRequest() {
      return 'requested';
    },
    usersAddingSuccess() {
      return 'finished';
    },
    usersAddingFailure() {
      return 'failed';
    },
    usersAddingReset() {
      return 'idle';
    },
  },
});

const {
  usersAddingRequest,
  usersAddingSuccess,
  usersAddingFailure,
} = usersAddingState.actions;

export const loadMoreUsers = (page) => (dispatch) => {
  dispatch(usersAddingRequest());

  return axios.get(`https://reqres.in/api/users?page=${page}`)
    .then((response) => {
      const newUsersData = get(response, 'data.data');

      dispatch(usersActions.addUsers({ users: newUsersData }));
      dispatch(currentPageActions.setCurrentPage({ currentPage: page }));

      dispatch(usersAddingSuccess());
    })
    .catch(() => {
      dispatch(usersAddingFailure());
    });
};

const actions = { ...usersAddingState.actions, loadMoreUsers };

export { actions };

export const getUsersAddingState = (state) => state.usersAddingState;

export default usersAddingState.reducer;
