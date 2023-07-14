import React, {useEffect, useState} from 'react';
import style from "./PostPage.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import PostRating from "../../components/post/postCommentaryRating/PostRating";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";

function PostPage() {
    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState()

    const [fetchPost, isFetchLoading, postError] = useFetching(async () => {
        const responseData = await PostService.getPostPage(params.id)
        console.log(responseData)
        setData(responseData)
    })
    useNotFoundNavigate(postError)


    useEffect(() => {
        if (params.id > 0) {
            fetchPost()
        }
        else {
            navigate("/not_found")
        }
    }, [])

    if (data)
    return (
        <div>
            <PostRating
                rating={data.rating - 2}
                rateStatus={data.ratedType}
                setData={setData}
            />
        </div>
    );
    else
        return <MySyncLoader />
}

export default PostPage;