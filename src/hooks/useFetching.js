import {useState} from "react";
import {getErrorResponseMessage} from "../utils/objectFunctions";

export function useFetching(callback) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetching() {
        setError('')
        try {
            setIsLoading(true)
            await callback()
        }
        catch (err) {
            setError(getErrorResponseMessage(err))
        }
        finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}