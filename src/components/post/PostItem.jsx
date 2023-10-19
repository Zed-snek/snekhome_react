import {useState, useContext, useEffect} from 'react';
import style from "./PostItem.module.css";
import ellipsis from "../../styles/ellipsis.module.css";
import {Link, useNavigate} from "react-router-dom";
import OutlineDiv from "../UI/blocks/OutlineDiv";
import PostRating from "../../pages/postPage/rating/PostRating";
import PostImagesSelector from "../images/PostImagesSelector";
import InfoDiv from "../UI/blocks/InfoDiv";
import UserInfo from "./postCreatorInfo/UserInfo";
import {getUserImage} from "../../functions/linkFunctions";
import CommunityInfo from "./postCreatorInfo/CommunityInfo";
import {formatDate} from "../../functions/timeDateFunctions";
import MyBoxedTextLink from "../UI/links/MyBoxedTextLink";
import NewCommentForm from "./commentary/NewCommentForm";
import {AuthContext} from "../context";
import GreyLink from "../UI/links/GreyLink";
import MoreOptionsButton from "../UI/navigation/MoreOptionsButton";
import MessageModal from "../UI/modal/MessageModal";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import MySyncLoader from "../UI/loaders/MySyncLoader";

function PostItem({type, postId, text, postImages, rating, ratedType, date, image, isAnon, userNickname,
            isCurrentUserAuthor, userFlair, groupname, groupTitle, commentaries, commentsAmount,
            isDeletePermission, deleteSuccessCallback
}) { //type: HOME / COMMUNITY / USER | image: user or community image | ratedType: UPVOTE/DOWNVOTE/NONE

    const {isAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const [isDeletePostModal, setIsDeletePostModal] = useState(false)
    const [isErrorModal, setIsErrorModal] = useState(false)
    const postLink = "/post/" + postId

    const [comments, setComments] = useState(commentaries?.length > 0 ? commentaries : [])
    const [commentsNumber, setCommentsNumber] = useState(commentsAmount)

    function addNewComment(comment) {
        setCommentsNumber(prev => prev + 1)
        if (comments.length === 2) {
            setComments(prev => {
                let arr = []
                arr.push(prev[1])
                arr.push(comment)
                return arr
            })
        }
        else {
            setComments(prev => [...prev, comment])
        }
    }

    const [rateObj, setRateObj] = useState({
        rating: rating,
        ratedType: ratedType
    })

    const [fetchDelete, isDeleteLoading, deleteError] = useFetching(async () => {
        await PostService.deletePost(postId)
        deleteSuccessCallback(postId)
    })

    useEffect(() => {
        if (deleteError)
            setIsErrorModal(true)
    }, [deleteError])

    function moreOptionsButton() {
        if (type === "COMMUNITY" || type === "USER") {
            let options = []
            if (isCurrentUserAuthor || (type === "COMMUNITY" && isDeletePermission))
                options.push({title: "Delete", onClick: () => setIsDeletePostModal(true)})
            if (isCurrentUserAuthor)
                options.push({title: "Edit", onClick: () => navigate(postLink + "/edit")})

            if (options.length > 0)
                return <MoreOptionsButton
                    options={options}
                />
        }
    }

    return (
        <OutlineDiv className={style.main}>
            <div id={style["order_rating"]}>
                <PostRating
                    rating={rateObj.rating}
                    rateStatus={rateObj.ratedType}
                    addRating={value => setRateObj(prev => ({...prev, rating: prev.rating + value}))}
                    setRatingStatus={newType => setRateObj(prev => ({...prev, ratedType: newType}))}
                    idPost={postId}
                    onClick={e => e.preventDefault()}
                />

                <div className={style.moreOptionsDiv}>
                    {moreOptionsButton()}
                </div>

                <MySyncLoader loading={isDeleteLoading}/>

                <MessageModal
                    visible={isDeletePostModal}
                    setVisible={setIsDeletePostModal}
                    acceptCallback={fetchDelete}
                >
                    Are you sure you want to delete this post?
                </MessageModal>

                <MessageModal
                    visible={isErrorModal}
                    setVisible={setIsErrorModal}
                >
                    {deleteError}
                </MessageModal>

                <Link to={postLink} className={style.link}/>
            </div>

            <div className={style.imageTextDiv} id={style["order_imageAndText"]}>
                { postImages.length > 0 ?
                    <PostImagesSelector
                        images={postImages}
                        isFlexForm={true}
                        width={454}
                        height={300}
                        className={style.imageSelector}
                        imgClassName={style.image}
                    />
                : <></> }

                <Link className={style.link} to={postLink}>
                    <InfoDiv className={style.text}>
                        {text}
                    </InfoDiv>
                </Link>
            </div>

            <div className={style.verticalLine}/>

            <div className={style.rightDiv} id={style["order_rightDiv"]}>
                <div className={style.flexColumn10px}>
                    <div>
                        <div>
                            { type === "HOME" ?
                                <InfoDiv className={style.homeNicknameAndDate}>
                                    { isAnon ?
                                        <div className={style.anonName}>
                                            Anonymous author
                                        </div>
                                        :
                                        <MyBoxedTextLink
                                            className={style.homeNickname}
                                            to={"/u/" + userNickname}
                                        >
                                            {userNickname}
                                        </MyBoxedTextLink>
                                    }

                                    <div className={style.homeDate}>
                                        {formatDate(date)}
                                    </div>
                                </InfoDiv>
                                : <></> }

                            { type === "COMMUNITY" ?
                                isAnon ?
                                    <UserInfo
                                        nickname="Anonymous author"
                                        isAnon
                                    />
                                    :
                                    <UserInfo
                                        nickname={userNickname}
                                        image={getUserImage(image)}
                                        flair={userFlair}
                                    />
                                : <></> }
                            { type !== "COMMUNITY" ?
                                <CommunityInfo
                                    image={getUserImage(image)}
                                    title={groupTitle}
                                    groupname={groupname}
                                />
                                : <></> }
                        </div>

                        {type !== "HOME" ?
                            <div className={style.date}>
                                { formatDate(date) + " "
                                    + (isAnon && type === "USER" ? "- post is anonymous" : "" )
                                }
                            </div>
                            : <></> }
                    </div>

                    <Link to={postLink} className={style.flexColumn10px + " " + style.link}> {/*comments list*/}
                        { comments?.map((value, index) =>
                            <InfoDiv className={style.comment + " " + ellipsis.main} key={index}>
                                <div className={style.commentNickname}>
                                    {value.nickname}
                                </div>
                                <div className={style.commentText + " " + ellipsis.children}>
                                    {value.text}
                                </div>
                            </InfoDiv>
                        )}
                    </Link>
                </div>

                <div className={style.commentFormDiv}>
                    <Link to={postLink} className={style.link} />
                    <div className={style.flexColumn10px}>
                        <GreyLink className={style.commentsAmount} to={"/post/" + postId}>
                            {commentsNumber} comments...
                        </GreyLink>
                        { isAuth ?
                            <NewCommentForm
                                reference={-1}
                                postId={postId}
                                addComment={addNewComment}
                                rows={1}
                            />
                            : <></> }
                    </div>
                </div>

            </div>
        </OutlineDiv>
    );
}

export default PostItem;