import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import style from "./Commentary.module.css";
import MyTextArea from "../../../components/UI/inputs/MyTextArea";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import SendSvg from "../../../components/UI/svg/SendSvg";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";
import FadingMessage from "../../../components/UI/message/FadingMessage";

function NewCommentForm({postId, reference, callbackOnSuccess}) {

    const [comment, setComment] = useState("")

    const [isErrorShow, setIsErrorShow] = useState(false)

    const [fetchNewComment, isNewCommentLoading, newCommentError] = useFetching(async () => {
        await PostService.newComment(postId, {text: comment, referenceId: reference})
        setComment("")
        if (callbackOnSuccess)
            callbackOnSuccess()
    })

    useEffect(() => {
        if (newCommentError)
            setIsErrorShow(true)
    }, [newCommentError])

    function postComment() {
        if (comment !== "")
            fetchNewComment()
    }

    return (
        <div className={style.commentaryInputDiv}>
            <MyTextArea
                className={style.textarea}
                placeholder="leave your commentary.."
                onChange={e => setComment(e.target.value)}
                rows={2}
                value={comment}
            />
            <div className={style.sendBtnDiv}>
                {
                    isNewCommentLoading
                        ? <MyPulseLoader size={8}/>
                        :
                        <MyTransparentButton
                            className={style.sendBtn}
                            onClick={postComment}
                        >
                            <SendSvg/>
                        </MyTransparentButton>
                }
            </div>
            <FadingMessage
                isShow={isErrorShow}
                setIsShow={setIsErrorShow}
                className={style.fadingMessage}
            >
                {newCommentError}
            </FadingMessage>
        </div>
    );
}

export default NewCommentForm;