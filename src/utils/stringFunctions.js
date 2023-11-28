
export function isNotBannedSymbols(s) {
    let c
    for (let i = 0; i < s.length; i++) {
        c = s.charCodeAt(i)
        if ( !( (c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57) || c === 45 || c === 95) ) //allowed a-z A-Z 0-9 - _
            return false
    }
    return true
}

export function toOnlyFirstLetterUpperCase(string) {
    return string[0].toUpperCase() + string.toLowerCase().substring(1)
}



