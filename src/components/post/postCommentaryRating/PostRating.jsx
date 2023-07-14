import React from 'react';
import {useRating} from "./useRating";
import RatingValue from "./RatingValue";

function PostRating({rating, rateStatus, setData, idPost}) { //rateStatus = UPVOTE/DOWNVOTE/NONE

    const [upvote, downvote, status] = useRating(rating, rateStatus, "POST", setData, idPost)

    return (
        <div>
            <RatingValue value={rating}/>
        </div>
    );
}

export default PostRating;