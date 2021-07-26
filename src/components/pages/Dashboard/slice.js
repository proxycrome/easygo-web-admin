import { createSlice } from "@reduxjs/toolkit";
import { Services } from "../../../services";


const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState: {
        dashboardStat: {
        },
        discountTypes: [],
        roleTypes: []
    },
    reducers: {
        addDashboardStat: (state, {payload}) => {
            state.dashboardStat = payload;
        },

        addDiscountTypes: (state, {payload}) => {
            state.discountTypes = payload;
        },

        addRoleTypes: (state, {payload}) => {
            state.roleTypes = payload;
        }
    }
});

export const { addDashboardStat, addDiscountTypes, addRoleTypes } = dashboardSlice.actions;

export const getDashboardStat = payload => dispatcher => {
    return Services.fetchDashboardStat(payload).then(
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

export const getDiscountTypes = payload => dispatcher => {
    return Services.getDiscountTypes(payload).then(
        response => {
            dispatcher(addDiscountTypes(response.data.data.body))
            return Promise.resolve(response.data);
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}

export const getRoleTypes = payload => dispatcher => {
    return Services.getRoleTypes(payload).then(
        response => {
            console.log('ROLES', response.data.data.body)
            dispatcher(addRoleTypes(response.data.data.body))
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
