import React, {useEffect, useState} from 'react';
import style from "./PostPage.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import PostRating from "../../components/post/postCommentaryRating/PostRating";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import PostImagesSelector from "../../components/images/PostImagesSelector";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import {formatDate} from "../../functions/timeDateFunctions";

function PostPage() {
    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState()

    const [fetchPost, isFetchLoading, postError] = useFetching(async () => {
        const responseData = await PostService.getPostPage(params.id)
        console.log(responseData)
        setData(responseData)
    })
    useNotFoundNavigate(postError)
    
    useEffect(() => {
        if (params.id > 0) {
            fetchPost()
        }
        else {
            navigate("/not_found")
        }
    }, [])

    if (data)
    return (
        <div className={style.main}>
            <div className={style.ratingDiv}>
                <PostRating
                    rating={data.rating}
                    addRating={value => setData(prev => ({...prev, rating: prev.rating + value}))}
                    rateStatus={data.ratedType}
                    setRatingStatus={value => setData(prev => ({...prev, ratedType: value}))}
                    idPost={params.id}
                />
            </div>
            <div className={style.content}>
                <OutlineFilledDiv className={style.imgAndTextDiv}>
                    {
                        data.post.images.length > 0
                        ? <PostImagesSelector
                                images={data.post.images}
                                isImageForm={true}
                                width={686}
                                height={450}
                                className={style.postImageSelector}
                                imgClassName={style.postImg}
                            />
                        : <></>
                    }

                    <div className={style.postText}>
                        {data.post.text}
                    </div>
                </OutlineFilledDiv>

            </div>

            <div>
                <div className={style.date}>
                    <div style={{fontSize: "14px"}}>
                        created
                    </div>
                    <div>
                        {formatDate(data.post.date)}
                    </div>
                </div>

                <div className={style.infoBannersDiv}>
                    <OutlineFilledDiv
                        className={style.infoBanner}
                    >
                        BLABLABLA
                    </OutlineFilledDiv>

                    <OutlineFilledDiv
                        className={style.infoBanner}
                    >
                        BLABLABLA
                    </OutlineFilledDiv>
                </div>
            </div>

        </div>
    );
    else
        return <MySyncLoader />
}

export default PostPage;