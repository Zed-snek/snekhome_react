
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import {useEffect, useState} from "react";


export function useGetRoles(setError, setIsLoader, groupname, communityType, isCommunityClosed) {

    const allowTypes = [
        {title: "editDescription", title2: "edit description", value: "Allow to edit image, name and description",
            toShow: true},
        {title: "editId", title2: "edit groupname", value: "Allow to edit groupname of community", toShow: true},
        {title: "deletePosts", title2: "delete posts", value:  "Allow to delete posts", toShow: true},
        {title: "banUser", title2: "ban users", value: "Allow to ban users", toShow: true},
        {title: "banCitizen", title2: "ban citizens", value: "Allow to ban citizens",
            toShow: communityType === 'DEMOCRACY'},
        {title: "inviteUsers", title2: "invite and accept requests",
            value: "Allow to invite users and accept join requests", toShow: isCommunityClosed}
    ]
    const typesToMap = allowTypes.filter(t => t.toShow)

    const [roles, setRoles] = useState([])
    const [fetchRoles, isFetchRolesLoading, fetchRolesError] = useFetching(async () => {
        let responseData = await CommunityService.getRoles(groupname)
        setRoles(responseData)
    })

    useEffect(() => {
        setIsLoader(isFetchRolesLoading)
    }, [isFetchRolesLoading])
    useEffect(() => {
        if (fetchRolesError)
            setError(fetchRolesError)
    }, [fetchRolesError])

    useEffect(() => {
        fetchRoles()
    }, [])

    return [typesToMap, roles, setRoles]
}