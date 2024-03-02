import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './reducers/messagesSlice';
import customerReducer from './reducers/customerSlice';
import adminReducer from './reducers/adminSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    customer: customerReducer,
    admin: adminReducer,
  },
});

export default store;