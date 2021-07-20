import { createSlice } from "@reduxjs/toolkit";
import { Services } from "../../../services";


const emailConfirmationSlice = createSlice({
    name: 'emailConfirmationSlice',
    initialState: {

    },
    reducers: {

    }
})


export const confirmEmail = payload => dispatcher => {
    return Services.confirmEmail(payload).then(
        response => {
            return Promise.resolve(response.data);
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    }
    )
}

export default emailConfirmationSlice.reducer;