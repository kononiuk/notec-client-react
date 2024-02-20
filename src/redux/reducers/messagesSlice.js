import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (message, { dispatch, getState }) => {
    dispatch(_addMessage(message));

    await new Promise(resolve => setTimeout(resolve, process.env.REACT_APP_MESSAGE_REMOVE_DELAY || 5000));

    const { messages } = getState();
    const index = messages.findIndex(m => m === message);
    dispatch(removeMessage(index));
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    _addMessage: (state, action) => {
      state.push(action.payload);
    },
    removeMessage: (state, action) => {
      return state.filter((message, index) => index !== action.payload);
    },
    clearMessages: state => {
      return [];
    },
  },
});

export const { _addMessage, removeMessage, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;