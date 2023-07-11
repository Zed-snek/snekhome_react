import React, {useEffect, useMemo, useState} from 'react';
import style from "./NewPostPage.module.css";
import {useNavigate, useParams} from "react-router-dom";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import {useFetchCommunity} from "../communityPage/useFetchCommunity";
import MyTextArea from "../../components/UI/inputs/MyTextArea";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import MyButton from "../../components/UI/buttons/MyButton";
import ImageToOpen from "../../components/images/ImageToOpen";
import MyFileInput from "../../components/UI/inputs/MyFileInput";
import FadingMessage from "../../components/UI/message/FadingMessage";
import MyMessage from "../../components/UI/message/MyMessage";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import MyCheckbox from "../../components/UI/inputs/MyCheckbox";

function NewPostPage() {

    const params = useParams()
    const navigate = useNavigate()
    const [data, setData, isCommunityLoading, communityError] = useFetchCommunity(params.groupname)
    useNotFoundNavigate(communityError)

    useEffect(() => {
        if (data && !data.access)
            navigate("/c/" + params.groupname)
    }, [data])

    const [text, setText] = useState('')
    const [images, setImages] = useState([])
    const [isAnon, setIsAnon] = useState(false)

    const [showImgError, setShowImgError] = useState(false)
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
        <div className={style.main}>
            <h3>
                New post in community <i>{params.groupname}</i>
            </h3>

            <MyMessage>
                {error}
            </MyMessage>

            <OutlineFilledDiv className={style.form}>
                <div className={style.titleDiv}>
                    <div className={style.title}>
                        Text:
                    </div>
                    <div className={style.subTitle}>
                        {text.length}/2048
                    </div>
                </div>
                <MyTextArea
                    className={style.textArea}
                    onChange={event => setText(event.target.value)}
                    placeholder="Type some text... (optional)"
                    value={text}
                    rows={4}
                    maxLength={2048}
                />

                <div className={style.titleDiv}>
                    <div className={style.title}>
                        Images:
                    </div>
                    <div className={style.subTitle}>
                        max. 10
                    </div>
                </div>
                <div className={style.chosenImages}>
                    <div>
                        <MyFileInput
                            maxFiles={10}
                            maxSize={10}
                            setImage={setImages}
                            setIsShowError={setShowImgError}
                        >
                            <div className={style.moreImagesBtn}>
                                +
                            </div>
                        </MyFileInput>
                    </div>
                    <div>
                        <div className={style.fadingMessageDiv}>
                            <FadingMessage
                                className={style.fadingMessage}
                                setIsShow={setShowImgError}
                                isShow={showImgError}
                            >
                                File is too big (max size allowed 10mb), <br/>
                                or too many images were chosen
                            </FadingMessage>
                        </div>
                    </div>

                    {
                        srcImages.map((element, index) =>
                            <ImageToOpen
                                key={index}
                                maxWidth={130}
                                maxHeight={130}
                                image={element}
                                toRemove={() => removeFile(index)}
                            />
                        )
                    }

                </div>

                <div className={style.btnDiv}>
                    <MySyncLoader loading={isPostLoading}/>

                    { data.community.anonAllowed ?
                        <MyCheckbox
                            label="is post anonymous"
                            onChange={event => setIsAnon(event.target.checked)}
                        />
                        : <></>
                    }

                    <MyButton onClick={newPost}>
                        Submit
                    </MyButton>
                </div>

            </OutlineFilledDiv>

        </div>
    );
    else
        return <MySyncLoader />
}

export default NewPostPage;