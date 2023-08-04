import React, {useState, useMemo, useEffect} from 'react';
import PostForm from "./PostForm";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import {useNavigate, useParams} from "react-router-dom";
import {useFetchPost} from "../postPage/useFetchPost";
import {getImageApiLink} from "../../functions/linkFunctions";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";

function EditPostPage() {

    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useFetchPost(params.id)

    const [newImages, setNewImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [text, setText] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (data) {
            setOldImages(data.post.images)
            setText(data.post.text)
        }
    }, [data])

    function isNewPicture(index) {
        return index >= data.post.images.length
    }

    function removeFile(index) {
        if (isNewPicture(index))
            setNewImages(prev => prev.filter(
                (file, idNumber) => index - data.post.images.length !== idNumber))
        else
            setOldImages(prev => prev.filter((element, idNumber) => index !== idNumber))
    }

    const srcImages = useMemo(() => {
        let arr = []
        if (data) {
            oldImages.forEach(element => {
                arr.push(getImageApiLink(element.name))
            })
            newImages.forEach(element => {
                arr.push(URL.createObjectURL(element))
            })
        }
        return arr
    }, [oldImages, newImages])

    const [fetchEdit, isEditLoading, editError] = useFetching(async () => {
        await PostService.updatePost(oldImages, newImages, text, params.id)
        navigate("/post/" + params.id)
    })
    useEffect(() => {
        if (editError)
            setError(editError)
    }, [editError])

    function onSubmit() {
        if (text === "" && newImages.length === 0 && oldImages.length === 0)
            setError("Post can't be empty")
        else
            fetchEdit()
    }

    if (data)
        return (
            <PostForm
                isEdit={true}
                setImages={setNewImages}
                text={text}
                setText={setText}
                error={error}
                onSubmit={onSubmit}
                isSomethingLoading={isEditLoading}
                srcImages={srcImages}
                removeFileByIndex={removeFile}
            />
        );
    else
        return <MySyncLoader />
}

export default EditPostPage;