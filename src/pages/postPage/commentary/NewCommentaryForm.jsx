import React, {useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import style from "./Commentary.module.css";
import MyTextArea from "../../../components/UI/inputs/MyTextArea";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import SendSvg from "../../../components/UI/svg/SendSvg";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";

function NewCommentaryForm({postId, reference}) {

    const [comment, setComment] = useState("")

    const [fetchNewComment, isNewCommentLoading, newCommentError] = useFetching(async () => {
        const responseData = await PostService.newComment(postId, {text: comment, referenceId: reference})
        console.log(responseData)
    })

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
        </div>
    );
}

export default NewCommentaryForm;