import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import {useState, useEffect} from "react";

export function useFetchCommunity(groupname) {

    const [data, setData] = useState()

    const [fetchCommunity, isCommunityLoading, communityError] = useFetching(async () => {
        let responseData = await CommunityService.getCommunity(groupname)
        setData(responseData)
        console.log(responseData)
    })

    useEffect(() => {
        fetchCommunity()
    }, [])

    return [data, setData, isCommunityLoading, communityError]
}

