import { createSlice  } from "@reduxjs/toolkit";
import { Services } from "../../../services";


const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        suspendedUserList: [],
        activeUserList: [],
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
                    dispatcher(addActiveUserList(response.data.data.body))
                }else if(payload.status === 'SUSPENDED'){
                    dispatcher(addSuspendedUserList(response.data.data.body))
                }
                console.log(response );
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
            console.log(response);
            dispatcher(addSingleUser(response.data.data.body));
            return Promise.resolve(response.data.data.body)
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}

export const selectUser = state => state.userReducer;
export default userSlice.reducer;

