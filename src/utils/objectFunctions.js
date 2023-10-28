export function isObjectNotEmpty(object) {
    return Object.keys(object).length > 0
}

export function getErrorResponseMessage(error) {
    console.log(error)
    if (error.response.data)
        return error.response.data.message
    else
        return error.message
}