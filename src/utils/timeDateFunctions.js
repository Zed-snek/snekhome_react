const dayInMilliseconds = 86400000;

export function formatDateWithMonthName(date) {
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date(date).toLocaleString('en-US', options)
}

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
    let newDate = date.toLocaleString("pl")
    if (newDate[2] !== '.')
        return 0 + newDate
    return newDate
}

export function formatDate(date) {
    let d
    if (date) {
        d = new Date(date + 'Z')
    }
    else {
        d = new Date()
    }

    const formatted = changeFormat(d)
    const now = new Date()

    if (isSameDay(d, now))
        return getTimeString(formatted) + ", today"
    else if (isDifferenceOneDay(d, now))
        return getTimeString(formatted) + ", yesterday"

    return getTimeString(formatted) + ' ' + getDateString(formatted)
}


export function formatLocalDate(date) {
    return date.substring(8) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4)
}