import {useFetching} from "./useFetching";
import CommunityService from "../API/CommunityService";
import {useState, useEffect} from "react";
import {useNotFoundNavigate} from "./useNotFoundNavigate";

export function useFetchCommunity(groupname) {

    const [data, setData] = useState()

    const [fetchCommunity, isCommunityLoading, communityError] = useFetching(async () => {
        let responseData = await CommunityService.getCommunity(groupname)
        setData(responseData)
    })

    useEffect(() => {
        fetchCommunity()
    }, [])

    useNotFoundNavigate(communityError)

    return [data, setData, isCommunityLoading, communityError]
}

