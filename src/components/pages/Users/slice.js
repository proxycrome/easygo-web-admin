import { createSlice  } from "@reduxjs/toolkit";
import { Services } from "../../../services";


const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        suspendedUserList:  { data: [], limit: 0, page: 0, total: 0 },
        activeUserList:  { data: [], limit: 0, page: 0, total: 0 },
        singleUser: {}
    },

    reducers: {
        addActiveUserList: (state, {payload}) => {
            state.activeUserList = payload;
        },
        addSuspendedUserList: (state, {payload}) => {
            state.suspendedUserList = payload;
        },
        addSingleUser: (state, {payload}) => {
            state.singleUser = payload;
        }
    }
});


export const { addActiveUserList , addSuspendedUserList, addSingleUser} = userSlice.actions;


export const fetchAllUser = (payload) => dispatcher => {
    return Services.fetchAllUser(payload).then(
            response => {
                if(payload.status === 'ACTIVE'){
                    dispatcher(addActiveUserList({
                        data: response.data.data.body,
                        total: response.data.total,
                        limit: response.data.limit,
                        page: response.data.page,
                      }))
                }else if(payload.status === 'SUSPENDED'){
                    dispatcher(addSuspendedUserList({
                        data: response.data.data.body,
                        total: response.data.total,
                        limit: response.data.limit,
                        page: response.data.page,
                      }))
                }
                return Promise.resolve()
            }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}

export const fetchUserByEmail = (payload) => dispatcher => {
    return Services.fetchUserByEmail(payload).then(
        response => {
            dispatcher(addSingleUser(response.data.data.body));
            return Promise.resolve(response.data.data.body)
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}


export const sendVerificationEmail = payload => dispatcher => {
    return Services.sendEmailVerification(payload).then(
        response => {
                return Promise.resolve(response.data)
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}

export const activateUser = payload => dispatcher => {
    return Services.activateUser(payload).then(
        response => {
            return Promise.resolve(response.data)
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}

export const suspendUser = payload => dispatcher => {
    return Services.suspendUser(payload).then(
        response => {
            return Promise.resolve(response.data)
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}


export const selectUser = state => state.userReducer;
export default userSlice.reducer;

