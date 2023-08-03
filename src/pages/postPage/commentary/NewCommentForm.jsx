import React, {useEffect, useState, useContext} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import style from "./Commentary.module.css";
import MyTextArea from "../../../components/UI/inputs/MyTextArea";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import SendSvg from "../../../components/UI/svg/SendSvg";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";
import FadingMessage from "../../../components/UI/message/FadingMessage";
import {UserContext} from "../../../components/context";

function NewCommentForm({postId, reference, callbackOnSuccess, addComment, idComment, editComment, editValue}) {

    const {userImageName, userNickname} = useContext(UserContext)

    const [comment, setComment] = useState(editValue ? editValue : "")

    const [isErrorShow, setIsErrorShow] = useState(false)

    const [fetchNewComment, isNewCommentLoading, newCommentError] = useFetching(async () => {
        if (editValue) {
            await PostService.updateComment(idComment, comment)
            editComment(idComment, comment)
        }
        else {
            const responseData = await PostService.newComment(postId, {text: comment, referenceId: reference})
            addComment({
                id: responseData.message,
                ratedType: "UPVOTE",
                rating: 1,
                reference: reference,
                text: comment,
                nickname: userNickname,
                image: userImageName
            })
        }

        if (callbackOnSuccess)
            callbackOnSuccess()
        else
            setComment("")
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
                { isNewCommentLoading
                    ? <MyPulseLoader size={8}/>
                    :
                    <div>
                        <div>
                            <MyTransparentButton
                                className={style.sendBtn}
                                onClick={postComment}
                            >
                                <SendSvg/>
                            </MyTransparentButton>
                        </div>
                        { editValue ?
                            <MyTransparentButton
                                className={style.sendBtn + ' ' + style.cancelBtn}
                                onClick={callbackOnSuccess}
                                tooltip="Cancel"
                            >
                                ✗
                            </MyTransparentButton>
                        : <></>}
                    </div>
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