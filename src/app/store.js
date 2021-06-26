import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/pages/SignIn/slice';
import userReducer from '../components/pages/Users/slice';
import dashboardReducer from '../components/pages/Dashboard/slice';
import emailConfirmationReducer from '../components/pages/EmailConfirmation/slice';
import transactionsReducer from '../components/pages/Transactions/slice';

export const store = configureStore({
  reducer: {
    loginReducer,
    userReducer,
    dashboardReducer,
    emailConfirmationReducer,
    transactionsReducer
  },
});
