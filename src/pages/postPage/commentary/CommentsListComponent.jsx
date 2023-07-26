import React, {useContext, useEffect, useState} from 'react';
import style from "./Commentary.module.css";
import NewCommentForm from "./NewCommentForm";
import {AuthContext} from "../../../components/context";
import {useParams} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import Commentary from "./Commentary";
import PostService from "../../../API/PostService";
import MyMessage from "../../../components/UI/message/MyMessage";

function CommentsListComponent() {
    const {isAuth} = useContext(AuthContext)
    const params = useParams()

    const [data, setData] = useState([])

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
        const responseData = await PostService.getCommentsByPostId(params.id)
        console.log(responseData)
        setData(responseData)
    })
    useEffect(() => {
        fetchComments()
    }, [])


    return (
        <div className={style.commentsListMain}>
            {isAuth ?
                <NewCommentForm
                    reference={-1} /*-1 = reference to the post, not to the other comment*/
                    postId={params.id}
                />
            : <></>}

            {commentsError ?
                <MyMessage>
                    {commentsError}
                </MyMessage>
            : <></>}

            {data ?
                <div>
                    { data
                        .filter(c => c.reference === -1)
                        .map(comment =>
                            <Commentary
                                key={comment.id}
                                comment={comment}
                                depthLevel={0}
                                data={data}
                                postId={params.id}
                                isAuth={isAuth}
                            />
                    )}

                </div>
            : <></>}
        </div>
    );
}

export default CommentsListComponent;