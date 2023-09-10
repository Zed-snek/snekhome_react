import {useMemo, useState} from "react";

function isInclude(query, object, params) {
    query = query.toLowerCase()
    for (let p of params) {
        if (object[p].toLowerCase().includes(query))
            return true
    }
    return false
}

export function useMemoSearch(array, searchParams) {
    const [searchQuery, setSearchQuery] = useState('')

    const searchedElements = useMemo(() => {
        return array.filter(obj => isInclude(searchQuery, obj, searchParams))
    }, [array, searchQuery])

    return [searchedElements, setSearchQuery]
}