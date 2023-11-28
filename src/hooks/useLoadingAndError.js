import {useEffect} from "react";

export function useLoadingAndError(isLoading, setGlobalLoading, error, setGlobalError) {
    useSetStateOnReact(error, setGlobalError)
    useSetStateOnReact(isLoading, setGlobalLoading)
}

export function useSetStateOnReact(dependency, setState) {

    useEffect(() => {
        setState(dependency)
    }, [dependency])
}
