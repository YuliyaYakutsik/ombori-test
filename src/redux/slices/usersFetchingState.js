import axios from 'axios';
import get from 'lodash/get';
import { createSlice } from '@reduxjs/toolkit';
import { actions as usersActions } from './users';
import { actions as totalPagesCountActions } from './totalPagesCount';

const initiallyFetchingPage = 1;

const usersFetchingState = createSlice({
  name: 'usersFetchingState',
  initialState: 'idle',
  reducers: {
    usersFetchRequest() {
      return 'requested';
    },
    usersFetchSuccess() {
      return 'finished';
    },
    usersFetchFailure() {
      return 'failed';
    },
  },
});

const {
  usersFetchRequest,
  usersFetchSuccess,
  usersFetchFailure,
} = usersFetchingState.actions;

export const fetchUsers = () => (dispatch) => {
  dispatch(usersFetchRequest());

  return axios.get(`https://reqres.in/api/users?page=${initiallyFetchingPage}`)
    .then((response) => {
      const totalPagesCount = get(response, 'data.total_pages');
      const fetchedUsers = get(response, 'data.data');
      const usersData = fetchedUsers;

      dispatch(totalPagesCountActions.setTotalPagesCount({ totalPagesCount }));
      dispatch(usersActions.addUsers({ users: usersData }));

      dispatch(usersFetchSuccess());
    })
    .catch(() => {
      dispatch(usersFetchFailure());
    });
};

const actions = { ...usersFetchingState.actions, fetchUsers };

export { actions };

export const getUsersFetchingState = (state) => state.usersFetchingState;

export default usersFetchingState.reducer;
