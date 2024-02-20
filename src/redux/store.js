import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './reducers/messagesSlice';
import customerReducer from './reducers/customerSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    customer: customerReducer,
  },
});

export default store;