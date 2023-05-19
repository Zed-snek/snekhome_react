import {useState} from "react";

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
            console.log(err)
            if (err.response.data === '') {
                setError(err.message)
            }
            else {
                setError(err.response.data.message)
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}