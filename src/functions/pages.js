export function getPageCount(totalElements, limit) {
    return Math.ceil(totalElements/limit)
}

export function getPagesArray(totalPages) {
    let pagesArray = []
    for (let i = 1; i <= totalPages; i++){
        pagesArray.push(i)
    }

    return pagesArray
}

