import {
    deleteRequestWithAuth,
    getRequest,
    getRequestWithAuth,
    postBodyRequestWithAuth, postParamsRequest,
    putRequestWithAuth
} from "./requestFunctions";


export default class UserService {

    static async navbarInfo() {
        return await getRequestWithAuth('/user/navbar')
    }

    static async userInfo(nickname) {
        return await getRequest('/user/' + nickname)
    }

    static async currentUserInfo() {
        return await getRequestWithAuth('/user/current')
    }

    static async updateUser(data) {
        return await putRequestWithAuth('/user/current', data)
    }

    static async newImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        return await postBodyRequestWithAuth('/user/current/image', formData)

    }

    static async newTag(data) {
        return await postBodyRequestWithAuth('/tag', data)
    }

    static async delTag(id) {
        return await deleteRequestWithAuth('/tag/' + id)
    }

    static async updateTag(data) {
        return await putRequestWithAuth('/tag', data)
    }

    static async addFriend(nickname) {
        return await postParamsRequest('/auth/friend/' + nickname)
    }
    static async delFriend(nickname) {
        return await deleteRequestWithAuth('/friend/' + nickname)
    }


}

