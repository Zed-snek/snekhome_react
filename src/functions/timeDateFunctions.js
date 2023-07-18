const dayInMilliseconds = 86400000;

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear()
}
function isDifferenceOneDay(date1, date2) {
    date2.setTime(date2.getTime() - dayInMilliseconds)
    return isSameDay(date1, date2)
}

function getTimeString(date) {
    return date.substring(12, 17)
}
function getDateString(date) {
    return date.substring(0, 10)
}

function changeFormat(date) {
    return date.toLocaleString("pl")
}

export function formatDate(date) {
    const d = new Date(date + 'Z')
    const formatted = changeFormat(d)
    const now = new Date()

    if (isSameDay(d, now))
        return getTimeString(formatted)
    else if (isDifferenceOneDay(d, now))
        return getTimeString(formatted) + ", yesterday"

    return getTimeString(formatted) + ' ' + getDateString(formatted)
}