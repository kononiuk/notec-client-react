import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {},
  reducers: {
    saveAdminData: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveAdminData } = adminSlice.actions;

export default adminSlice.reducer;