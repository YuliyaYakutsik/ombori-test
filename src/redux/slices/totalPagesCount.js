import { createSlice } from '@reduxjs/toolkit';

const totalPagesCount = createSlice({
  name: 'totalPagesCount',
  initialState: 0,
  reducers: {
    setTotalPagesCount(state, action) {
      return action.payload.totalPagesCount;
    },
  },
});

const actions = { ...totalPagesCount.actions };

export { actions };

export const getTotalPagesCount = (state) => state.totalPagesCount;

export default totalPagesCount.reducer;
