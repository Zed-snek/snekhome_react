import {getRequest} from "./requestFunctions";

export default class SearchService {

    static async firstSearch(value) {
        return await getRequest("/search/" + value)
    }

    static async searchByType(value, page, type) {
        return await getRequest(`/search/by_type/${type}/${value}?page=${page}`)
    }

    static async searchCommunities(value, page) {
        return await this.searchByType(value, page, "community")
    }

    static async searchUsers(value, page) {
        return await this.searchByType(value, page, "user")
    }

}