import React, {useEffect, useState} from 'react';
import style from "./JoinRequestsPage.module.css";
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import CommunityService from "../../API/CommunityService";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";

function JoinRequestsPage() {

    const params = useParams()

    const [data, setData] = useState()

    const [fetchRequests, isFetchLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getJoinRequests(params.groupname)
        console.log(responseData)
        setData(responseData)
    })

    useNotFoundNavigate(fetchError)

    useEffect(() => {
        fetchRequests()
    }, [])

    if (data)
        return (
            <div className={style.main}>
                <div className={style.content}>

                </div>
            </div>
        );
    else
        return <MySyncLoader />
}

export default JoinRequestsPage;