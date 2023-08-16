import React, {useState} from 'react';
import style from "./PostItem.module.css";
import {useNavigate} from "react-router-dom";
import OutlineDiv from "../UI/blocks/OutlineDiv";
import PostRating from "../../pages/postPage/rating/PostRating";

function PostItem({type, postId, text, postImages, rating, ratedType, date, image, isAnon, userNickname, userFlair,
                      groupname, groupTitle, commentaries, commentsAmount}
) { //type: HOME / COMMUNITY / USER | image: user or community image | ratedType: UPVOTE/DOWNVOTE/NONE

    const navigate = useNavigate()
    const [rateObj, setRateObj] = useState({
        rating: rating,
        ratedType: ratedType
    })

    return (
        <OutlineDiv className={style.main}>
            <div>
                <PostRating
                    rating={rateObj.rating}
                    rateStatus={rateObj.ratedType}
                    addRating={value => setRateObj(prev => ({...prev, rating: prev.rating + value}))}
                    setRatingStatus={newType => setRateObj(prev => ({...prev, ratedType: newType}))}
                    idPost={postId}
                />
            </div>
            <div>

            </div>
            <div>

            </div>
        </OutlineDiv>
    );
}

export default PostItem;