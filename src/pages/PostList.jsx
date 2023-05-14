import React, {useEffect, useMemo, useState} from 'react';
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/buttons/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../functions/pages";
import Pagination from "../components/pagination/Pagination";

function PostList(props) {
    const [comments, setComments] = useState([
        { id: 1, title: 'SpongeBob@bikini.bottom', body: 'CRABSBURGER CRABSBURGERCRABSBURGERCRABSBURGER CRABSBURGER' },
        { id: 2, title: 'TommyVercetti@vicecity.com', body: 'Listen Sunny, I will you bring the cocaine and the money' }
    ])

    function commentFromChild(newComment) {
        setComments([...comments, newComment])
        setModalWindow(false)
    }
    function removeComment(comment) {
        setComments(comments.filter(c => c.id !== comment.id))
    }

    const[filter, setFilter] = useState({sort: '', search: ''})

    const sortedAndSearchComments = usePosts(comments, filter.sort, filter.search)

    const [modalWindow, setModalWindow] = useState(false)


    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)

    const [pagesArray, setPagesArray] = useState()

    const [fetchComments, isCommentsLoading, commentError] = useFetching(async () => {
        const [comments, totalComments] = await PostService.getPosts(limit, currentPage)
        setTotalPages(getPageCount(totalComments, limit))
        setComments(comments)
    })

    useEffect( () => {
        fetchComments()
        }, [currentPage] )

    useMemo( () => {
        setPagesArray( getPagesArray(totalPages) )
    }, [comments] )

    return (
        <div>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            {/*Отображение комментариев*/}
            {commentError &&
                <h1>Ошибка ${commentError}</h1>
            }
            {
                isCommentsLoading
                    ? <h1>Идет загрузка...</h1>
                    : sortedAndSearchComments.length !== 0
                            ? <>
                                <h1>Список постов</h1>{
                                sortedAndSearchComments.map(post =>
                                    <Post remove={removeComment} post={post} key={post.id}/>
                                )}
                              </>
                            : <h1>Комментарии не найдены</h1>
            }


            <MyButton onClick={() => setModalWindow(true)}>
                Добавить комментарий
            </MyButton>

            <MyButton onClick={fetchComments}>
                Запрос на сервер
            </MyButton>

            <MyModal visible={modalWindow} setVisible={setModalWindow}>
                <PostForm create={commentFromChild}/>
            </MyModal>

            <Pagination totalPages={totalPages} currentPage={currentPage} onClick={setCurrentPage} pagesArray={pagesArray}/>


        </div>
    );
}

export default PostList;