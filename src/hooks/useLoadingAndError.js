import {useEffect} from "react";

export function useLoadingAndError(isLoading, setGlobalLoading, error, setGlobalError) {

    useEffect(() => {
        setGlobalError(error)
    }, [error])
    useEffect(() => {
        setGlobalLoading(isLoading)
    }, [isLoading])

}