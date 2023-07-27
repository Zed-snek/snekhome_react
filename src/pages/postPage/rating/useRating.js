import {useContext, useState} from 'react';
import {AuthContext} from "../../../components/context";
import PostService from "../../../API/PostService";

export function useRating(rating, addRating, status, type, setData, id) { //type = comment/post | status = UPVOTE/DOWNVOTE/NONE

    const {isAuth} = useContext(AuthContext)
    const [ratingStatus, setRatingStatus] = useState(status)

    async function requestChange(newValue, newRating) {
        setRatingStatus(newValue)
        let func
        if (type === "POST")
            func = PostService.changePostRating(id, newValue)
        else
            func = PostService.changeCommentaryRating(id, newValue)
        await func
            .then(() => {
                setData(ratingStatus)
                addRating(newRating)
            })
            .catch(() => setRatingStatus(status))
    }

    function vote(type) { //type = up/down
        if (isAuth) {
            if (type === "up" && ratingStatus === "UPVOTE")
                requestChange("NONE", -1)
            else if (type === "down" && ratingStatus === "DOWNVOTE")
                requestChange("NONE", 1)
            else if (type === "up" && ratingStatus === "DOWNVOTE")
                requestChange("UPVOTE", 2)
            else if (type === "down" && ratingStatus === "UPVOTE")
                requestChange("DOWNVOTE", -2)
            else if (type === "up")
                requestChange("UPVOTE", 1)
            else
                requestChange("DOWNVOTE", -1)
        }
    }

    return [() => vote("up"), () => vote("down"), ratingStatus]
}