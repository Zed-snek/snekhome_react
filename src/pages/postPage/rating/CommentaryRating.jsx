import React from 'react';
import {useRating} from "./useRating";
import style from "./PostCommenataryRating.module.css";
import RatingValue from "./RatingValue";
import MyGreyOutlineButton from "../../../components/UI/buttons/MyGreyOutlineButton";
import ArrowUp from "../../../components/svg/ArrowUp";
import ArrowDown from "../../../components/svg/ArrowDown";

function CommentaryRating({rating, addRating, rateStatus, setRatingStatus, idComment}) {

    const [upvote, downvote, status] = useRating(rating, addRating, rateStatus, "COMMENT", setRatingStatus, idComment)

    function btnStyle(s) {
        let styles = status === s ? style.ratingActive : ""
        return style.commentArrowBtn + " " + styles
    }
    function arrowColor(s) {
        return status === s ? "#E3E3E3" : "#939393"
    }

    return (
        <div className={style.commentaryMain}>
            <div>
                <MyGreyOutlineButton
                    onClick={() => upvote()}
                    className={btnStyle("UPVOTE")}
                >
                    <ArrowUp color={arrowColor("UPVOTE")}/>
                </MyGreyOutlineButton>
            </div>
            <div>
                <MyGreyOutlineButton
                    onClick={() => downvote()}
                    className={btnStyle("DOWNVOTE")}
                >
                    <ArrowDown color={arrowColor("DOWNVOTE")}/>
                </MyGreyOutlineButton>
            </div>
            <div className={style.ratingValueDiv}>
                <RatingValue value={rating}/>
            </div>
        </div>
    );
}

export default CommentaryRating;