import axios from "axios";
import domain from "./domain";
import { routes } from "./routes";
import getURLParams from "./utils/getParams";

export class Services{
    static login(payload){
        return axios({
            method: 'POST',
            url: `${domain}${routes.loginRoute}`,
            data: payload.data,
        })
    }

    static fetchAllUser(payload){
        const page = payload.page || 0;
        const size = payload.pageSize || 10;

        return axios({
            method: 'GET',
            url:`${domain}${routes.userRoute}?role=USER&page=${page}&size=${size}&status=${payload.status}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }


    static fetchUserByEmail(payload){
        return axios({
            method: 'GET',
            url: `${domain}${routes.userRoute}/details/email?email=${payload.email}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    static fetchDashboardStat(){
        return axios({
            method: 'GET',
            url: `${domain}${routes.getDashboardStatRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    static sendEmailVerification(payload){
        return axios({
            method: 'POST',
            url: `${domain}${routes.sendEmailVerificationRoute}/${payload.email}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    static activateUser(payload){
        return axios({
            method: 'PUT',
            url: `${domain}${routes.activateUserRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            data: payload.data
        })
    }

    static suspendUser(payload){
        return axios({
            method: 'PUT',
            url: `${domain}${routes.suspendUserRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            data: payload.data
        })
    }

    static confirmEmail(payload){
        return axios({
            method: 'GET',
            url: `${domain}${routes.emailConfirmationRoute}${payload.token}`,
        })
    }

    static fetchTransactions(payload){
        const page = payload.page || 0;
        const size = payload.pageSize || 10;
        
        return axios({
            method: 'GET',
            url: `${domain}${routes.transactionRoute}?&page=${page}&size=${size}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
        })
    }

    static fetchTransactionsWithFilter(payload){
        const params = getURLParams({...payload}).replace('Successful', true).replace('Failed', false);
       
        return axios({
            method: 'GET',
            url: `${domain}${routes.transactionWithFilterRoute}${params}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
        })
    }

    static fetchTransactionsByEmail(payload){
        const page = payload.page || 0;
        const size = payload.pageSize || 10;

        return axios({
            method: 'GET',
            url: `${domain}${routes.transactionRoute}users/customer-email?page=${page}&size=${size}&customer-email=${payload.email}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
        })
    }


    static requeryTransaction(payload){
        return axios({
            method: 'POST',
            url:`${domain}${routes.requeryRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            data: payload.data
        })
    }
}