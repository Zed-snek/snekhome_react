import {useObserver} from "./useObserver";
import {useState, useEffect, useRef} from "react";

export function usePaginateLoad(fetchFunc, isFetchLoading) {

    const [pageNumber, setPageNumber] = useState(0)
    const [canLoad, setCanLoad] = useState(true)
    const lastElementRef = useRef()

    useObserver(lastElementRef, canLoad, isFetchLoading, () => {
        setPageNumber(prev => prev + 1)
    })

    useEffect(() => {
        fetchFunc()
    }, [pageNumber])

    return [pageNumber, lastElementRef, setCanLoad]
}