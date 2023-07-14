import {useContext, useState} from 'react';
import {AuthContext} from "../../context";
import PostService from "../../../API/PostService";

export function useRating(rating, status, type, setData, id) { //type = commentary/post | status = UPVOTE/DOWNVOTE/NONE

    const {isAuth} = useContext(AuthContext)
    const [ratingStatus, setRatingStatus] = useState(status)

    async function requestChange(newValue) {
        setRatingStatus(newValue)
        let func
        if (type === "POST")
            func = PostService.changePostRating(id, newValue)
        else
            func = PostService.changeCommentaryRating(id, newValue)
        await func
            .then(() => setData(ratingStatus))
            .catch(() => setRatingStatus(status))
    }

    function vote(type) { //type = up/down
        if (isAuth) {
            if ((type === "up" && ratingStatus === "UPVOTE") || (type === "down" && ratingStatus === "DOWNVOTE"))
                requestChange("NONE")
            else if (type === "up")
                requestChange("UPVOTE")
            else
                requestChange("DOWNVOTE")
        }
    }

    return [() => vote("up"), () => vote("down"), ratingStatus]
}