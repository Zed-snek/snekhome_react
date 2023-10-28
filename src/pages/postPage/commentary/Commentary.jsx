import {useState, useContext} from 'react';
import style from './Commentary.module.css';
import NewCommentForm from "../../../components/post/commentary/NewCommentForm";
import {getUserImage} from "../../../utils/linkFunctions";
import BoxedTextLink from "../../../components/UI/links/BoxedTextLink";
import CommentaryRating from "../rating/CommentaryRating";
import {AuthContext, UserContext} from "../../../components/context";
import MoreOptionsButton from "../../../components/UI/navigation/MoreOptionsButton";
import MessageModal from "../../../components/UI/modal/MessageModal";
import ReplyButton from "../../../components/post/commentary/ReplyButton";
import {formatDate} from "../../../utils/timeDateFunctions";

function Commentary({
    postId, comment, depthLevel, data, setData, isPermitToDelete, addComment, deleteComment, editComment
}) {

    const {isAuth} = useContext(AuthContext)
    const {userNickname} = useContext(UserContext)

    const [isReply, setIsReply] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)

    function setRatingStatus(value) {
        setData(prev => prev.map(c =>
            c.id === comment.id
                ? {...c, ratedType: value}
                : c
        ))
    }
    function addRating(value) {
        setData(prev => prev.map(c =>
            c.id === comment.id
            ? {...c, rating: c.rating + value}
            : c
        ))
    }

    function moreOptionsButton() {
        if (isPermitToDelete || comment.nickname === userNickname) {
            let options = [{title: "Delete", onClick: () => setIsDeleteModal(true)}]
            if (comment.nickname === userNickname)
                options.push({title: "Edit", onClick: () => setIsEdit(true)})
            return <MoreOptionsButton
                options={options}
                className={style.moreOptions}
            />
        }
    }

    function getVerticalLineClass() {
        if (depthLevel === 0)
            return ''
        if (depthLevel % 2 === 0)
            return style.lineDiv + ' ' + style.orangeLine
        else
            return style.lineDiv + ' ' + style.blueLine
    }

    return (
        <div
            className={style.commentMain + ' ' + (depthLevel === 0 ? style.highestLevel : '')}
            id={"comment" + comment.id}
        >
            <div className={getVerticalLineClass()} >
                <div> </div>
            </div>

            <div className={style.commentDiv + ' ' + (depthLevel > 0 ? style.commentInside : '')}>
                <div className={style.userInfoDiv}>
                    <img src={getUserImage(comment.image)} className="smallestUserImage"  alt=""/>
                    <BoxedTextLink to={"/u/" + comment.nickname} className={style.nickname}>
                        {comment.nickname}
                    </BoxedTextLink>
                    <div className={style.moreOptionsDiv}>
                        {moreOptionsButton()}
                    </div>
                    <MessageModal
                        visible={isDeleteModal}
                        setVisible={setIsDeleteModal}
                        acceptCallback={() => deleteComment(comment.id)}
                    >
                        Are you sure you want to delete this commentary?
                    </MessageModal>
                </div>

                { isEdit ?
                    <NewCommentForm
                        callbackOnSuccess={() => setIsEdit(false)}
                        idComment={comment.id}
                        editValue={comment.text}
                        editComment={editComment}
                    />
                    :
                    <div className={style.text}>
                        {comment.text}
                    </div>
                }

                <div className={style.bottomDiv}>
                    <div className={style.ratingDiv}>
                        <CommentaryRating
                            rating={comment.rating}
                            rateStatus={comment.ratedType}
                            idComment={comment.id}
                            addRating={addRating}
                            setRatingStatus={setRatingStatus}
                        />

                        <ReplyButton
                            isShow={isAuth}
                            isReply={isReply}
                            setIsReply={setIsReply}
                        />
                    </div>

                    <div className={style.dateDiv}>
                        {formatDate(comment.date)}
                    </div>
                </div>

                { isReply ?
                    <NewCommentForm
                        reference={comment.id}
                        postId={postId}
                        callbackOnSuccess={() => setIsReply(false)}
                        addComment={addComment}
                    />
                : <></> }

                <div>
                    { data
                        .filter(c => c.reference === comment.id)
                        .map(comment =>
                            <Commentary
                                key={comment.id}
                                comment={comment}
                                depthLevel={depthLevel + 1}
                                data={data}
                                setData={setData}
                                isPermitToDelete={isPermitToDelete}
                                addComment={addComment}
                                postId={postId}
                                deleteComment={deleteComment}
                                editComment={editComment}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}

export default Commentary;