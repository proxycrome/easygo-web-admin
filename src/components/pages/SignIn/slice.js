import { createSlice } from "@reduxjs/toolkit";
import { Services } from "../../../services";


const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        adminDetail: {

        }
    },
    reducers:{
        addAdminDetail: (state, {payload}) => {
            state.adminDetail = payload;
        }
    }
});


export const { addAdminDetail } = loginSlice.actions;

export const loginAdmin = payload => dispatcher => {
    return Services.login(payload).then(
        response => {
            console.log(response);
            localStorage.token = response.data.data.body.accessToken
            return Promise.resolve(response.data.data)
        }
    ).catch(error => {
        if(error.response){
            return error.response.data
        }
    })
}

export default loginSlice.reducer;