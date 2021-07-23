import { createSlice } from '@reduxjs/toolkit';
import { Services } from '../../../services';


const servicesSlice = createSlice({
    name: 'servicesSlice',
    initialState: {
        services: [],
        paginationProps: {limit: 0, page: 0, total: 0}
    },

    reducers: {
        addServices: (state, {payload}) => {
            state.services = payload;
        },

        addPaginationPros : (state, {payload}) => {
            state.paginationProps = payload;
        }
    }
});

export const { addServices, addPaginationPros } = servicesSlice.actions;

export const fetchAllServices = payload => dispatcher => {
    return Services.fetchAllServices(payload).then(
        response => {
            console.log('SERVICES', response);
            dispatcher(addServices(response.data.data.body));
            dispatcher(addPaginationPros({page: response.data.page, limit: response.data.limit, total: response.data.total}));
            return Promise.resolve(response.data.data.body);
        }
    ).catch(error => {
        if(error.response){
            Promise.reject(error.response.data);
        }
    })
}



export const servicesSelector = state => state.services;

export default servicesSlice.reducer;