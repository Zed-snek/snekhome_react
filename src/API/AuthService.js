import {postBodyRequest, postParamsRequest, putRequestWithAuth} from "./requestFunctions";
import api from "./apiConfiguration";

export default class AuthService {

    static async loginUser(userData) {
        return await postBodyRequest("/user/login", userData)
    }

    static async registerUser(userData) {
        return await postBodyRequest("/user/register", userData)
    }

    static async manageConfirmation(token) {
        return await postParamsRequest("/user/confirmation?token=" + token)
    }

    static async changePassword(data) {
        return await putRequestWithAuth("/user/password", data)
    }

    static async changeEmail(address) {
        return await putRequestWithAuth("/user/email", { email: address } )
    }

    static async refreshToken() {
        const token = localStorage.getItem('refreshToken')
        return (await api.post("/user/refresh-token", null,
            {
                headers: {
                    Authorization: token
                }
            }
            )).data
    }

}


