import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetchCommunity} from "../communityPage/useFetchCommunity";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import PostForm from "./PostForm";

function NewPostPage() {

    const params = useParams()
    const navigate = useNavigate()
    const [data, setData, isCommunityLoading] = useFetchCommunity(params.groupname)

    useEffect(() => {
        if (data && !data.access)
            navigate("/c/" + params.groupname)
    }, [data])


    const [images, setImages] = useState([])
    const [isAnon, setIsAnon] = useState(false)
    const [text, setText] = useState('')

    const [error, setError] = useState('')

    const srcImages = useMemo(() => {
        let arr = []
        images.forEach((element) => {
            arr.push(URL.createObjectURL(element))
        })
        return arr
    }, [images])

    function removeFile(id) {
        setImages(prev => prev.filter((file, index) => id !== index))
    }

    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const responseData = await PostService.newPost(images, text, params.groupname, isAnon)
        navigate("/post/" + responseData.message)
    })
    useEffect(() => {
        if (postError)
            setError(postError)
    }, [postError])

    function newPost() {
        if (images.length === 0 && text === '')
            setError("Post can't be empty")
        else
            fetchPost()
    }

    if (data)
    return (
        <PostForm
            setImages={setImages}
            text={text}
            setText={setText}
            error={error}
            onSubmit={newPost}
            isSomethingLoading={isPostLoading}
            srcImages={srcImages}
            removeFileByIndex={removeFile}
            setIsAnon={setIsAnon}
            isAnonAllowed={data.community.anonAllowed}
        />
    );
    else
        return <MySyncLoader />
}

export default NewPostPage;