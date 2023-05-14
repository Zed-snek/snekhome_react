import {postBodyRequest, postParamsRequest, putRequestWithAuth} from "./requestFunctions";

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

}


