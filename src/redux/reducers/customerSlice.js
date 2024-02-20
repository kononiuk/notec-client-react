import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {},
  reducers: {
    saveCustomerData: (state, action) => {
      return action.payload;
    },
  },
});

export const { saveCustomerData } = customerSlice.actions;

export default customerSlice.reducer;