import React from 'react';
import style from "./PostItem.module.css";
import {useNavigate} from "react-router-dom";

function PostItem({type, postId, text, postImages, rating, ratedType, date, image, isAnon, userNickname, userFlair,
                      groupname, groupTitle, comments, commentsAmount}
) { //type: user page/home page/community page | image: user or community image | ratedType: UPVOTE/DOWNVOTE/NONE

    const navigate = useNavigate()

    return (
        <div className={style.main}>

        </div>
    );
}

export default PostItem;