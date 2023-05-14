import {useMemo} from "react";

export function useSortedComments(comments, sort) {

    function getSortedComments(){
        if (sort){
            return [...comments].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return comments;
    }
    const sortedComments = useMemo(getSortedComments, [comments, sort])

    return sortedComments
}

export function usePosts(comments, sort, search){

    const sortedComments = useSortedComments(comments, sort)

    const sortedAndSearchComments = useMemo( () => {
        return sortedComments.filter(comment => comment.title.includes(search))
    }, [search, sortedComments])

    return sortedAndSearchComments;
}

