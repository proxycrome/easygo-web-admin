import axios from "axios";
import domain from "./domain";
import { routes } from "./routes";

export class Services{
    static login(payload){
        return axios({
            method: 'POST',
            url: `${domain}${routes.loginRoute}`,
            data: payload.data,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    }
}