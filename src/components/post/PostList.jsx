import {useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import style from "./PostList.module.css";
import PostService from "../../API/PostService";
import PostItem from "./PostItem";
import {usePaginateLoad} from "../../hooks/usePaginateLoad";
import LoaderAndErrorDiv from "../structureComponents/LoaderAndErrorDiv";

function PostList({loadType, entityName, isDeletePermission}) { //loadType: HOME / COMMUNITY / USER

    const [data, setData] = useState([])

    const [fetchPosts, isFetchLoading, fetchError] = useFetching(async () => {
        let responseData
        switch (loadType) {
            case "HOME":
                responseData = await PostService.getPostsForHomePage(pageNumber)
                break
            case "COMMUNITY":
                responseData = await PostService.getPostsForCommunityPage(entityName, pageNumber)
                break
            case "USER":
                responseData = await PostService.getPostsForUserPage(entityName, pageNumber)
                break
        }
        if (responseData.length === 0)
            setCanLoad(false)
        setData(prev => [...prev, ...responseData])
    })

    const [pageNumber, lastElement, setCanLoad] = usePaginateLoad(fetchPosts, isFetchLoading)

    function onSuccessDelete(id) {
        setData(prev => prev.filter(obj => obj.post.idPost !== id))
    }

    return (
        <div className={style.main}>

            { data.length > 0 ?
                data.map((item, index) =>
                    <PostItem
                        key={index}
                        type={loadType}
                        postId={item.post.idPost}
                        text={item.post.text}
                        postImages={item.post.images}
                        rating={item.rating}
                        ratedType={item.ratedType}
                        date={item.post.date}
                        isAnon={item.post.anonymous}
                        commentaries={item.commentaries}
                        commentsAmount={item.comments}
                        image={ loadType === "COMMUNITY" && !item.post.anonymous
                            ? item.userImage
                            : item.groupImage
                        }
                        userFlair={ item.roleTitle ? {
                            title: item.roleTitle,
                            textColor: item.roleTextColor,
                            bannerColor: item.roleBannerColor
                        } : null }
                        userNickname={item.userNickname}
                        isCurrentUserAuthor={item.currentUserAuthor}
                        isDeletePermission={isDeletePermission}
                        deleteSuccessCallback={onSuccessDelete}
                        groupname={item.groupname}
                        groupTitle={item.groupTitle}
                    />
                )
            : <></> }

            <LoaderAndErrorDiv error={fetchError} isLoading={isFetchLoading}/>
            {lastElement} {/*trigger to load next posts*/}

        </div>
    );
}

export default PostList;