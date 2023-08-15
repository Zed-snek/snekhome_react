import {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import style from "./PostList.module.css";
import MySyncLoader from "../UI/loaders/MySyncLoader";
import PostService from "../../API/PostService";
import MyMessage from "../UI/message/MyMessage";

function PostList({loadType, entityName}) { //loadType: HOME / COMMUNITY / USER

    const [pageNumber, setPageNumber] = useState(0)
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
        setData(prev => [...prev, responseData])
        console.log(responseData)
    })

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className={style.main}>


            <div className={style.loaderDiv}>
                <MyMessage className={style.error}>{fetchError}</MyMessage>
                <MySyncLoader loading={isFetchLoading} />
            </div>
        </div>
    );
}

export default PostList;