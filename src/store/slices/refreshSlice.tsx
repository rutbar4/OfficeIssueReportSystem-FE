import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: 0,
  reducers: {
    refresh: state => state + 1,
  },
});

export const { refresh } = refreshSlice.actions;

export default refreshSlice.reducer;