import React, {useState, useContext} from 'react';
import style from './Commentary.module.css';
import NewCommentForm from "./NewCommentForm";
import {getUserImage} from "../../../functions/linkFunctions";
import MyBoxedTextLink from "../../../components/UI/links/MyBoxedTextLink";
import MyGreyOutlineButton from "../../../components/UI/buttons/MyGreyOutlineButton";
import CommentaryRating from "../rating/CommentaryRating";
import {AuthContext, UserContext} from "../../../components/context";
import MoreOptionsButton from "../../../components/UI/navigation/MoreOptionsButton";

function Commentary({postId, comment, depthLevel, data, setData, isPermitToDelete, addComment}) {

    const [isReply, setIsReply] = useState(false)
    const {isAuth} = useContext(AuthContext)
    const {userNickname} = useContext(UserContext)

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

    function moreOptionsButton() {
        if (isPermitToDelete || comment.userNickname === userNickname) {
            let options = [{title: "Delete", onClick: () => console.log("Delete")}]
            if (data.userNickname === userNickname)
                options.push({title: "Edit", onClick: () => console.log("Edit")})
            return <MoreOptionsButton
                options={options}
                className={style.moreOptions}
            />
        }
    }

    return (
        <div className={style.commentDiv + ' ' + getClass()}>

            <div className={style.userInfoDiv}>
                <img src={getUserImage(comment.image)} className="smallestUserImage"  alt=""/>
                <MyBoxedTextLink to={"/u/" + comment.nickname} className={style.nickname}>
                    {comment.nickname}
                </MyBoxedTextLink>
                <div className={style.moreOptionsDiv}>
                    {moreOptionsButton()}
                </div>
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