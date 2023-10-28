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

    static async newImage(file, groupname) {
        const formData = new FormData();
        formData.append('image', file);
        return await postBodyRequestWithAuth('/community/image/' + groupname, formData)
    }

    static async getJoinedCommunities(nickname) {
        return await getRequest('/community_list/' + nickname)
    }

    static async getMembers(groupname) {
        return await getRequest('/members/' + groupname )
    }

    static async getBannedUsers(groupname) {
        return await getRequest('/banned_users/' + groupname)
    }

    static async newRole(data, groupname) {
        return await postBodyRequestWithAuth('/community/role/' + groupname, data)
    }

    static async updateRole(data, groupname, oldRoleName) {
        return await putRequestWithAuth(`/community/role/${groupname}/${oldRoleName}`, data)
    }

    static async deleteRole(groupname, roleName) {
        return await deleteRequestWithAuth(`/community/role/${groupname}/${roleName}`)
    }

    static async getRoles(groupname, ) {
        return await getRequest(`/community/roles/${groupname}`)
    }

    static async banUser(groupname, username) {
        return await postParamsRequestWithAuth(`/community/${groupname}/ban/${username}`)
    }
    static async unbanUser(groupname, username) {
        return await deleteRequestWithAuth(`/community/${groupname}/unban/${username}`)
    }

    static async setRole(username, groupname, roleName) {
        return await postParamsRequestWithAuth(`/community/${groupname}/role/${roleName}/set/${username}`)
    }

    static async revokeRole(groupname, username) {
        return await deleteRequestWithAuth(`/community/${groupname}/role/revoke/${username}`)
    }

    static async updateCommunitySettings(groupname, newSettings) {
        return await putRequestWithAuth(`/community/${groupname}/settings`, newSettings)
    }

    static async updateDemocracySettings(groupname, newSettings) {
        return await putRequestWithAuth(`/community/${groupname}/democracy`, newSettings)
    }

    static async manageJoinRequest(groupname) {
        return await postParamsRequestWithAuth(`/community/${groupname}/request`)
    }

    static async getJoinRequests(groupname) {
        return await getRequestWithAuth(`/community/${groupname}/request`)
    }

    static async acceptJoinRequest(groupname, nickname) {
        return await postParamsRequestWithAuth(`/community/${groupname}/request/${nickname}`)
    }

    static async cancelJoinRequest(groupname, nickname) {
        return await deleteRequestWithAuth(`/community/${groupname}/request/${nickname}`)
    }

    static async getLogs(groupname, page) {
        return await getRequestWithAuth(`/community/${groupname}/logs?page=${page}`)
    }

    static async getDemocracyData(groupname) {
        return await getRequest("/democracy/" + groupname)
    }

    static async becomeCandidate(groupname) {
        return await putRequestWithAuth(`/democracy/candidate/${groupname}/activate`)
    }

    static async createCandidateProgram(groupname, program) {
        return await postBodyRequestWithAuth("/democracy/candidate", {
            groupname: groupname,
            program: program
        })
    }

    static async updateCandidateProgram(groupname, program) {
        return await putRequestWithAuth("/democracy/candidate", {
            groupname: groupname,
            program: program
        })
    }

    static async getCandidateList(groupname) {
        return await getRequest("/democracy/candidates/" + groupname)
    }

    static async makeVote(groupname, candidateNickname) {
        return await postParamsRequestWithAuth(`/democracy/vote/${groupname}?nickname=${candidateNickname}`)
    }

}
