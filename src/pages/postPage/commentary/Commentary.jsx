import React, {useState, useContext} from 'react';
import style from './Commentary.module.css';
import NewCommentForm from "./NewCommentForm";
import {getUserImage} from "../../../functions/linkFunctions";
import MyBoxedTextLink from "../../../components/UI/links/MyBoxedTextLink";
import MyGreyOutlineButton from "../../../components/UI/buttons/MyGreyOutlineButton";
import CommentaryRating from "../rating/CommentaryRating";
import {AuthContext} from "../../../components/context";

function Commentary({postId, comment, depthLevel, data, setData, addComment}) {

    const [isReply, setIsReply] = useState(false)
    const {isAuth} = useContext(AuthContext)

    function getClass() {
        if (depthLevel === 0)
            return style.higherLevel
        if (depthLevel / 2 === 0)
            return  style.higherLevel + ' ' + style.orangeLeft + ' ' + style.commentInside
        else
            return  style.lowerLevel + ' ' + style.blueLeft + ' ' + style.commentInside
    }

    function setRatingStatus(value) {
        setData(prev => prev.map(c =>
            c.id === comment.id
                ? {...c, ratedType: value}
                : c
        ))
    }
    function addRating(value) { /*({...prev, rating: prev.rating + value})*/
        setData(prev => prev.map(c =>
            c.id === comment.id
            ? {...c, rating: c.rating + value}
            : c
        ))
    }

    return (
        <div className={style.commentDiv + ' ' + getClass()}>

            <div className={style.userInfo}>
                <img src={getUserImage(comment.image)} className="smallestUserImage"  alt=""/>
                <MyBoxedTextLink to={"/u/" + comment.nickname} className={style.nickname}>
                    {comment.nickname}
                </MyBoxedTextLink>
            </div>

            <div className={style.text}>
                {comment.text}
            </div>

            <div className={style.ratingDiv}>
                <CommentaryRating
                    rating={comment.rating}
                    rateStatus={comment.ratedType}
                    idComment={comment.id}
                    addRating={addRating}
                    setRatingStatus={setRatingStatus}
                />

                {isAuth ?
                    <div>
                        <MyGreyOutlineButton
                            onClick={() => setIsReply(prev => !prev)}
                            className={isReply ? style.replyBtnActive : ''}
                        >
                            Reply
                        </MyGreyOutlineButton>
                    </div>
                : <></>}
            </div>

            {isReply ?
                <NewCommentForm
                    reference={comment.id}
                    postId={postId}
                    callbackOnSuccess={() => setIsReply(false)}
                    addComment={addComment}
                />
            : <></>}

            <div>

            </div>
        </div>
    );
}

export default Commentary;