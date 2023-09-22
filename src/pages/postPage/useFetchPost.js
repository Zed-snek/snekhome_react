import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export function useFetchPost(id) {

    const navigate = useNavigate()
    const [data, setData] = useState()

    const [fetchPost, isFetchLoading, postError] = useFetching(async () => {
        const responseData = await PostService.getPostPage(id)
        setData(responseData)
    })
    useNotFoundNavigate(postError)

    useEffect(() => {
        if (id > 0)
            fetchPost()
        else
            navigate("/not_found")
    }, [])

    return [data, setData]
}