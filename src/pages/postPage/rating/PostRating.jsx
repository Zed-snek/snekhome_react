import React from 'react';
import {useRating} from "./useRating";
import RatingValue from "./RatingValue";
import ArrowUp from "../../../components/UI/svg/ArrowUp";
import ArrowDown from "../../../components/UI/svg/ArrowDown";
import style from "./PostCommenataryRating.module.css";

function PostRating({rating, addRating, rateStatus, setRatingStatus, idPost}) { //rateStatus = UPVOTE/DOWNVOTE/NONE

    const [upvote, downvote, status] = useRating(rating, addRating, rateStatus, "POST", setRatingStatus, idPost)

    return (
        <div className={style.postRatingMain}>
            <div className={style.postRatingValue}>
                <RatingValue value={rating}/>
            </div>

            <div>
                <div className={style.postRatingBtn} onClick={() => upvote()}>
                    <div className={
                            status === "UPVOTE" ? style.postSvgDiv + " " + style.postSvgDivActive : style.postSvgDiv
                    }>
                        <ArrowUp />
                    </div>
                    <div className={style.postBtnTitle}>
                        Base
                    </div>
                </div>

                <div className={style.postRatingBtn} onClick={() => downvote()}>
                    <div className={
                        status === "DOWNVOTE" ? style.postSvgDiv + " " + style.postSvgDivActive : style.postSvgDiv
                    }>
                        <ArrowDown />
                    </div>
                    <div className={style.postBtnTitle}>
                        Cringe
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PostRating;