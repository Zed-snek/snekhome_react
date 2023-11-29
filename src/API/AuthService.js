import {postBodyRequest, postParamsRequest, putRequest, putRequestWithAuth} from "./requestFunctions";
import {publicApi} from "./apiConfiguration";

export default class AuthService {

    static async loginUser(userData) {
        return await postBodyRequest("/user/login", userData)
    }

    static async registerUser(userData) {
        return await postBodyRequest("/user/register", userData)
    }

    static async sendResetPasswordEmail(email) {
        return await postBodyRequest("/user/reset_password", { email: email })
    }

    static async manageConfirmation(token) {
        return await postParamsRequest("/user/confirmation?token=" + token)
    }

    static async changePassword(data) {
        return await putRequestWithAuth("/user/password", data) //data: oldPass, newPass
    }

    static async resetPassword(token, password) {
        return await putRequest("/user/reset_password", {
            token: token,
            newPass: password
        })
    }

    static async changeEmail(email) {
        return await putRequestWithAuth("/user/email", { email: email })
    }

    static async refreshToken() {
        const token = localStorage.getItem('refreshToken')
        const response = (await publicApi.post("/user/refresh-token", null, {
                headers: {
                    Authorization: token
                }
            })).data
        localStorage.setItem('authToken', 'Bearer ' + response.token)
        return response
    }


}


