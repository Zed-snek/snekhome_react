import {getRequest} from "./requestFunctions";

export default class SearchService {

    static async firstSearch(value) {
        return await getRequest("/search/" + value)
    }

    static async searchByType(value, page, pageSize, type) {
        return await getRequest(`/search/by_type/${type}/${value}?page=${page}&pageSize=${pageSize}`)
    }

    static async searchCommunities(value, page, pageSize) {
        await this.searchByType(value, page, pageSize, "community")
    }

    static async searchUsers(value, page, pageSize) {
        await this.searchByType(value, page, pageSize, "user")
    }

}