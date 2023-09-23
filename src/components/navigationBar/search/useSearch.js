import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import SearchService from "../../../API/SearchService";
import {usePaginateLoad} from "../../../hooks/usePaginateLoad";

export function useSearch(value) {

    const [usersData, setUsersData] = useState([])
    const [communitiesData, setCommunitiesData] = useState([])
    const [error, setError] = useState("")

    async function fetchDataByType(type, data, setData, setCanLoad) {
        setError("")
        let responseData
        if (type === "COMMUNITY")
            responseData = await SearchService.searchCommunities(value, communityPageNumber)
        /*else
            responseData = await SearchService.searchUsers(value, userPageNumber)*/

        if (responseData.length > 0) {
            if (data.length === 4)
                responseData.filter((element, index) => index > 3)
            setData(prev => [...prev, ...responseData])
        }
        else {
            setCanLoad(false)
        }
    }

    /*fetch communities: */
    const [searchCommunities, isCommunitiesLoading, communitiesError] = useFetching(async () => {
        await fetchDataByType("COMMUNITY", communitiesData, setCommunitiesData, setCanCommunityLoad)
    })
    const [communityPageNumber, communityTriggerElement, setCanCommunityLoad]
        = usePaginateLoad(searchCommunities, isCommunitiesLoading)

    /*fetch users: */
    /*const [searchUsers, isUsersLoading, usersError] = useFetching(async () => {
        await fetchDataByType("USER", usersData, setUsersData, setCanUserLoad)
    })
    const [userPageNumber, userTriggerElement, setCanUserLoad]
        = usePaginateLoad(searchUsers, isUsersLoading)*/


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
        /*else if (usersError)
            setError(usersError)*/
        else if (firstSearchError)
            setError(firstSearchError)
    }, [communitiesError, /*usersError,*/ firstSearchError])


    return [searchFirst, usersData, communitiesData, communityTriggerElement, /*userTriggerElement,*/ error,
        isCommunitiesLoading || /*isUsersLoading ||*/ isFirstLoading]
}