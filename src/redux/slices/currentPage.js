import { createSlice } from '@reduxjs/toolkit';

const currentPage = createSlice({
  name: 'currentPage',
  initialState: 1,
  reducers: {
    setCurrentPage(state, action) {
      return action.payload.currentPage;
    },
  },
});

const actions = { ...currentPage.actions };

export { actions };

export const getCurrentPage = (state) => state.currentPage;

export default currentPage.reducer;
