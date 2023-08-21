import {useState, useContext} from 'react';
import style from "./PostItem.module.css";
import {Link} from "react-router-dom";
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

function PostItem({type, postId, text, postImages, rating, ratedType, date, image, isAnon, userNickname, userFlair,
                      groupname, groupTitle, commentaries, commentsAmount}
) { //type: HOME / COMMUNITY / USER | image: user or community image | ratedType: UPVOTE/DOWNVOTE/NONE

    const {isAuth} = useContext(AuthContext)

    const [rateObj, setRateObj] = useState({
        rating: rating,
        ratedType: ratedType
    })

    const postLink = "/post/" + postId

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
                <Link to={postLink} className={style.link}/>
            </div>
            <div className={style.imageTextDiv} id={style["order_imageAndText"]}>
                {postImages.length > 0 ?
                    <PostImagesSelector
                        images={postImages}
                        isFlexForm={true}
                        width={454}
                        height={300}
                        className={style.imageSelector}
                        imgClassName={style.image}
                    />
                    : <></>}
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
                            {type === "HOME" ?
                                <InfoDiv className={style.homeNicknameAndDate}>
                                    {isAnon ? <div/> :
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
                                : <></>}

                            {type === "COMMUNITY" && !isAnon ?
                                <UserInfo
                                    nickname={userNickname}
                                    image={getUserImage(image)}
                                    flair={userFlair}
                                />
                                : <></>}
                            {type !== "COMMUNITY" ?
                                <CommunityInfo
                                    image={getUserImage(image)}
                                    title={groupTitle}
                                    groupname={groupname}
                                />
                                : <></>}
                        </div>

                        {type !== "HOME" ?
                            <div className={style.date}>
                                {formatDate(date)}
                            </div>
                            : <></>}
                    </div>

                    <div className={style.flexColumn10px}> {/*comments list*/}
                        {commentaries?.map((value, index) =>
                            <InfoDiv className={style.comment} key={index}>
                                <div className={style.commentNickname}>
                                    {value.nickname}
                                </div>
                                <div className={style.commentText}>
                                    {value.text}
                                </div>
                            </InfoDiv>
                        )}
                    </div>
                </div>

                <div className={style.commentFormDiv}>
                    <Link to={postLink} className={style.link} />
                    <div className={style.flexColumn10px}>
                        <GreyLink className={style.commentsAmount} to={"/post/" + postId}>
                            {commentsAmount} comments...
                        </GreyLink>
                        {isAuth ?
                            <NewCommentForm
                                reference={-1}
                                postId={postId}
                                addComment={() => console.log("addComment")}
                                rows={1}
                            />
                            : <></>}
                    </div>
                </div>

            </div>
        </OutlineDiv>
    );
}

export default PostItem;