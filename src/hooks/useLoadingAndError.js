import {useEffect} from "react";

export function useLoadingAndError(isLoading, setGlobalLoading, error, setGlobalError) {

    useGlobalError(error, setGlobalError)
    useGlobalLoading(isLoading, setGlobalLoading)
}

export function useGlobalError(error, setGlobalError) {

    useEffect(() => {
        setGlobalError(error)
    }, [error])
}

export function useGlobalLoading(isLoading, setGlobalLoading) {

    useEffect(() => {
        setGlobalLoading(isLoading)
    }, [isLoading])
}