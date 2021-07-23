import { createSlice } from '@reduxjs/toolkit';
import { Services } from '../../../services';


const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: {
        notificationList: []
    },
    reducers: {
        addNotificationList: (state, {payload}) => {
            state.notificationList = payload;
        }
    }
});

export const { addNotificationList } = notificationSlice.actions;

export const selectNotification = state => state.notification

export default notificationSlice.reducer;

