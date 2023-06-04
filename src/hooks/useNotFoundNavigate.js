import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function useNotFoundNavigate(error) {
    const navigate = useNavigate()

    useEffect(() => {
        if (error)
            navigate('/not_found')
    }, [error])
}