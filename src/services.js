import axios from "axios";
import domain from "./domain";
import { routes } from "./routes";

export class Services{
    static login(payload){
        return axios({
            method: 'POST',
            url: `${routes.loginRoute}`,
            data: payload.data,
        })
    }

    static fetchAllUser(payload){
        const page = payload.page || 0;
        const size = payload.pageSize || 10;

        return axios({
            method: 'GET',
            url:`${routes.userRoute}?role=USER&page=${page}&size=${size}&status=${payload.status}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }


    static fetchUserByEmail(payload){
        return axios({
            method: 'GET',
            url: `${routes.userRoute}/details/email?email=${payload.email}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    static fetchDashboardStat(){
        return axios({
            method: 'GET',
            url: `${routes.getDashboardStatRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    static sendEmailVerification(payload){
        return axios({
            method: 'POST',
            url: `${routes.sendEmailVerificationRoute}/${payload.email}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    static activateUser(payload){
        return axios({
            method: 'PUT',
            url: `${routes.activateUserRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            data: payload.data
        })
    }

    static suspendUser(payload){
        return axios({
            method: 'PUT',
            url: `${routes.suspendUserRoute}`,
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            },
            data: payload.data
        })
    }
}