import {
    deleteRequestWithAuth,
    getRequest, getRequestWithAuth,
    postBodyRequestWithAuth,
    postParamsRequestWithAuth, putRequestWithAuth
} from "./requestFunctions";



export default class CommunityService {

    static async newCommunity(data) {
        return await postBodyRequestWithAuth("/community", data)
    }

    static async isNameNotTaken(groupname) {
        return await getRequest("/community/isNotTaken/" + groupname)
    }

    static async getCommunity(groupname) {
        return await getRequest("/community/" + groupname)
    }

    static async joinCommunity(groupname) {
        return await postParamsRequestWithAuth("/community/member/" + groupname)
    }
    static async leaveCommunity(groupname) {
        return await deleteRequestWithAuth("/community/member/" + groupname)
    }

    static async getHomeCards() {
        return await getRequestWithAuth("/communities/home_cards")
    }

    static async updateCommunityDetails(data) {
        return await putRequestWithAuth("/community", data)
    }

}
