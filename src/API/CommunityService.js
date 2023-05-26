import {getRequest, postBodyRequestWithAuth} from "./requestFunctions";


export default class CommunityService {

    static async newCommunity(data) {
        return await postBodyRequestWithAuth("/community", data)
    }

    static async isNameNotTaken(groupname) {
        return await getRequest("/community/isNotTaken/" + groupname)
    }

}