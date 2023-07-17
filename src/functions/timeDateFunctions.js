

function transformByTimezone(date) {
    const userOffset = new Date().getTimezoneOffset()
    const postTime = new Date(date)
    return new Date(postTime.getTime() + userOffset * -60 * 1000)
}

function changeFormat(date) {
    return addZeroIfLessThan10(date.getDate()) + '.'
        + (addZeroIfLessThan10(date.getMonth() + 1)) + '.'
        + date.getFullYear() + ' '
        + date.getHours() + ':'
        + date.getMinutes()
}

function addZeroIfLessThan10(number) {
    if (number < 10)
        return 0 + '' + number
    else
        return number
}

export function formatDate(date) {
    return changeFormat(transformByTimezone(date))
}