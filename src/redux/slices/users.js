import { createSlice } from '@reduxjs/toolkit';

const users = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUsers(state, action) {
      return [...state, ...action.payload.users];
    },
  },
});

const actions = { ...users.actions };

export { actions };

export const getUsers = (state) => state.users;

export default users.reducer;
