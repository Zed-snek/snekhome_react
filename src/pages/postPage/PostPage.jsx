import {useContext, useEffect, useState} from 'react';
import style from "./PostPage.module.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import PostRating from "./rating/PostRating";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import PostImagesSelector from "../../components/images/PostImagesSelector";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import {formatDate, formatLocalDate} from "../../functions/timeDateFunctions";
import {getCommunityImage, getUserImage} from "../../functions/linkFunctions";
import CommentsListComponent from "./commentary/CommentsListComponent";
import MyBoxedTextLink from "../../components/UI/links/MyBoxedTextLink";
import MoreOptionsButton from "../../components/UI/navigation/MoreOptionsButton";
import {UserContext} from "../../components/context";
import MessageModal from "../../components/UI/modal/MessageModal";
import {useFetchPost} from "./useFetchPost";

function PostPage() {

    const params = useParams()
    const navigate = useNavigate()
    const {userNickname} = useContext(UserContext)

    const [data, setData] = useFetchPost(params.id)

    const [isDeletePostModal, setIsDeletePostModal] = useState(false)
    const [isErrorModal, setIsErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const isPermitToDel = data && (data.role && data.role.deletePosts === true)


    const [fetchDelete, isDeleteLoading, deleteError] = useFetching(async () => {
        await PostService.deletePost(params.id)
        navigate("/c/" + data.groupname)
    })

    useEffect(() => {
        if (deleteError) {
            setErrorMessage(deleteError)
            setIsErrorModal(true)
        }
        else
            setErrorMessage("")
    }, [deleteError])

    function moreOptionsButton() {
        if (isPermitToDel || data.userNickname === userNickname) {
            let options = [{title: "Delete", onClick: () => setIsDeletePostModal(true)}]
            if (data.userNickname === userNickname)
                options.push({title: "Edit", onClick: () => navigate("/post/" + params.id + "/edit")})
            return <MoreOptionsButton
                options={options}
            />
        }
    }

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
                <div className={style.moreOptionsDiv}>
                    {moreOptionsButton()}
                </div>
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
                    {errorMessage}
                </MessageModal>

                <OutlineFilledDiv className={style.imgAndTextDiv}>
                    { data.post.images.length > 0
                        ? <PostImagesSelector
                                images={data.post.images}
                                isImageForm={true}
                                width={686}
                                height={450}
                                className={style.postImageSelector}
                                imgClassName={style.postImg}
                            />
                    : <></> }

                    <div className={style.postText}>
                        {data.post.text}
                    </div>
                </OutlineFilledDiv>

                <div className={style.date}>
                    created {formatDate(data.post.date)}
                </div>

                <CommentsListComponent
                    isPermitToDel={isPermitToDel}
                    setErrorMessage={setErrorMessage}
                    setIsErrorModal={setIsErrorModal}
                />


            </div>

            <div className={style.infoBannersDiv}>
                {data.post.anonymous ? <></>
                    :
                <OutlineFilledDiv
                    className={style.infoBanner}
                >
                    <div className={style.infoBannerName}>
                        {data.userName + ' ' + data.userSurname}
                    </div>
                    <Link to={"/u/" + data.userNickname}>
                        <img src={getUserImage(data.userImage)} alt=""/>
                    </Link>
                    <MyBoxedTextLink to={"/u/" + data.userNickname}>
                        @{data.userNickname}
                    </MyBoxedTextLink>
                </OutlineFilledDiv>
                }

                <OutlineFilledDiv
                    className={style.infoBanner}
                >
                    <div className={style.infoBannerName}>
                        {data.groupTitle}
                    </div>
                    <Link to={"/c/" + data.groupname}>
                        <img src={getCommunityImage(data.groupImage)} alt=""/>
                    </Link>
                    <MyBoxedTextLink to={"/c/" + data.groupname}>
                        @{data.groupname}
                    </MyBoxedTextLink>
                    <div className={style.communityDate}>
                        created {formatLocalDate(data.communityDate)}
                    </div>
                </OutlineFilledDiv>

            </div>
        </div>
    );
    else
        return <MySyncLoader />
}

export default PostPage;