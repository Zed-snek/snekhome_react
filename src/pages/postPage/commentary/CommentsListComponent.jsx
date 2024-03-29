import {useContext, useEffect, useState} from 'react';
import style from "./Commentary.module.css";
import NewCommentForm from "../../../components/post/commentary/NewCommentForm";
import {AuthContext} from "../../../components/context";
import {useParams} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import Commentary from "./Commentary";
import PostService from "../../../API/PostService";
import MyMessage from "../../../components/UI/message/MyMessage";

function CommentsListComponent({isPermitToDel, setIsErrorModal, setErrorMessage}) {
    const {isAuth} = useContext(AuthContext)
    const params = useParams()

    const [data, setData] = useState([])

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
        const responseData = await PostService.getCommentsByPostId(params.id)
        setData(responseData)
    })
    useEffect(() => {
        fetchComments()
    }, [])

    function addComment(comment) {
        setData(prev => [comment, ...prev])
    }
    function editComment(id, text) {
        setData(prev => {
            return prev.map(c => {
                if (c.id === id)
                    return {...c, text: text}
                return c
            })
        })
    }

    async function deleteComment(id) {
        await PostService.deleteComment(id)
            .then(() => {
                setData(prev => prev.filter(comment => comment.id !== id))
            })
            .catch(exception => {
                setErrorMessage(exception)
                setIsErrorModal(true)
            })
    }

    return (
        <div className={style.commentsListMain}>
            {isAuth ?
                <div className={style.basicCommentForm}>
                    <NewCommentForm
                        reference={-1} /*-1 = reference to the post, not to the other comment*/
                        postId={params.id}
                        addComment={addComment}
                    />
                </div>
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
                                setData={setData}
                                isPermitToDelete={isPermitToDel}
                                addComment={addComment}
                                postId={params.id}
                                deleteComment={deleteComment}
                                editComment={editComment}
                            />
                    )}

                </div>
            : <></>}
        </div>
    );
}

export default CommentsListComponent;