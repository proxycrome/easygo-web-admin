import { createSlice } from "@reduxjs/toolkit";
import { Services } from "../../../services";

const transactionSlice = createSlice({
    name: 'transactionSlice',
    initialState: {
        transactionByemail: []
    },
    reducers: {
        addTransactionByEmail: (state, {payload}) => {
            state.transactionByemail = payload
        }
    }
});


export const { addTransactionByEmail } = transactionSlice.actions;

export const fetchTransactions = payload => dispatcher => {
    return Services.fetchTransactions(payload).then(
        response => {
            console.log('Transactions',response)
            return Promise.resolve(response.data.data.body);
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}

export const fetchTransactionsByEmail = payload => dispatcher => {
    return Services.fetchTransactionsByEmail(payload).then(
        response => {
            console.log(response.data.data.body);
            dispatcher(addTransactionByEmail(response.data.data.body))
            return Promise.resolve(response.data.data.body);
        }
    ).catch(error => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
    })
}


export const selectTransactions = state => state.transactionsReducer

export default transactionSlice.reducer;