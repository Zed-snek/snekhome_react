import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import SearchService from "../../../API/SearchService";
import {usePaginateLoad} from "../../../hooks/usePaginateLoad";

export function useSearch(value) {

    const [usersData, setUsersData] = useState([])
    const [communitiesData, setCommunitiesData] = useState([])

    const [error, setError] = useState("")

    /*fetch communities: */
    const [searchCommunities, isCommunitiesLoading, communitiesError] = useFetching(async () => {
        setError("")
        let responseData = await SearchService.searchCommunities(value)
        if (communitiesData.length === 4)
            responseData.filter((element, index) => index > 3)
        setUsersData(prev => [...prev, ...responseData])
    })
    //usePaginateLoad(searchCommunities, isCommunitiesLoading)


    /*fetch users: */
    const [searchUsers, isUsersLoading, usersError] = useFetching(async () => {
        setError("")
        let responseData = await SearchService.searchUsers(value)
        if (usersData.length === 4)
            responseData.filter((element, index) => index > 3)
        setUsersData(prev => [...prev, ...responseData])
    })
    //usePaginateLoad(searchUsers, isUsersLoading)

    /*fetch both, while first searching: */
    const [searchFirst, isFirstLoading, firstSearchError] = useFetching(async () => {
        setError("")
        const responseData = await SearchService.firstSearch(value)
        setUsersData(responseData.users)
        setCommunitiesData(responseData.communities)
    })

    /*error handling*/
    useEffect(() => {
        if (communitiesError)
            setError(communitiesError)
        else if (usersError)
            setError(usersError)
        else if (firstSearchError)
            setError(firstSearchError)
    }, [communitiesError, usersError, firstSearchError])


    return [searchFirst, searchCommunities, searchUsers, usersData, communitiesData,
        error, isCommunitiesLoading || isUsersLoading || isFirstLoading]
}