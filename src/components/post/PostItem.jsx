import React, {useState} from 'react';
import style from "./PostItem.module.css";
import {useNavigate} from "react-router-dom";
import OutlineDiv from "../UI/blocks/OutlineDiv";
import PostRating from "../../pages/postPage/rating/PostRating";
import PostImagesSelector from "../images/PostImagesSelector";
import InfoDiv from "../UI/blocks/InfoDiv";
import UserInfo from "./postCreatorInfo/UserInfo";
import {getUserImage} from "../../functions/linkFunctions";
import CommunityInfo from "./postCreatorInfo/CommunityInfo";

function PostItem({type, postId, text, postImages, rating, ratedType, date, image, isAnon, userNickname, userFlair,
                      groupname, groupTitle, commentaries, commentsAmount}
) { //type: HOME / COMMUNITY / USER | image: user or community image | ratedType: UPVOTE/DOWNVOTE/NONE

    const navigate = useNavigate()
    const [rateObj, setRateObj] = useState({
        rating: rating,
        ratedType: ratedType
    })

    return (
        <OutlineDiv className={style.main}>
            <div>
                <PostRating
                    rating={rateObj.rating}
                    rateStatus={rateObj.ratedType}
                    addRating={value => setRateObj(prev => ({...prev, rating: prev.rating + value}))}
                    setRatingStatus={newType => setRateObj(prev => ({...prev, ratedType: newType}))}
                    idPost={postId}
                />
            </div>
            <div className={style.imageTextDiv}>
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
                <InfoDiv className={style.text}>
                    {text}
                </InfoDiv>
            </div>

            <div className={style.verticalLine} />

            <div>
                <div>
                    { type === "COMMUNITY" && !isAnon ?
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

                <div>

                </div>

                <div>

                </div>
            </div>
        </OutlineDiv>
    );
}

export default PostItem;