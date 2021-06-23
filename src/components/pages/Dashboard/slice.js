import { createSlice } from "@reduxjs/toolkit";
import { Services } from "../../../services";


const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState: {
        dashboardStat: {

        }
    },
    reducers: {
        addDashboardStat: (state, {payload}) => {
            state.dashboardStat = payload;
        }
    }
});

export const { addDashboardStat } = dashboardSlice.actions;

export const getDashboardStat = payload => dispatcher => {
    return Services.fetchDashboardStat().then(
        response => {
            dispatcher(addDashboardStat(response.data))
            return Promise.resolve(response.data);
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}


export const selectDashboard = state => state.dashboardReducer;

export default dashboardSlice.reducer;
