import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/pages/SignIn/slice';
import userReducer from '../components/pages/Users/slice'


export const store = configureStore({
  reducer: {
    loginReducer,
    userReducer
  },
});
