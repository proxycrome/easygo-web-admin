import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/pages/SignIn/slice';


export const store = configureStore({
  reducer: {
    loginReducer
  },
});
