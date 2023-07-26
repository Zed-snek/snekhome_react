import React, {useState} from 'react';
import style from './Commentary.module.css';
import NewCommentForm from "./NewCommentForm";
import {getUserImage} from "../../../functions/linkFunctions";
import MyTextLink from "../../../components/UI/links/MyTextLink";
import MyBoxedTextLink from "../../../components/UI/links/MyBoxedTextLink";

function Commentary({postId, comment, depthLevel, data, isAuth}) {

    const [isReply, setIsReply] = useState(false)

    function getClass() {
        if (depthLevel === 0)
            return style.higherLevel
        if (depthLevel / 2 === 0)
            return  style.higherLevel + ' ' + style.orangeLeft + ' ' + style.commentInside
        else
            return  style.lowerLevel + ' ' + style.blueLeft + ' ' + style.commentInside
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

            <div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                {isAuth ?
                    <div>

                    </div>
                : <></>}
            </div>

            {isReply ?
                <NewCommentForm
                    reference={comment.id}
                    postId={postId}
                    callbackOnSuccess={() => setIsReply(false)}
                />
            : <></>}

            <div>

            </div>
        </div>
    );
}

export default Commentary;