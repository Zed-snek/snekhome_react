import defaultUserImage from "../images/defaultUserImage.png";

export function getUserImage(image) {
    if (!image) {
        return defaultUserImage
    }
    else {
        return getImageApiLink(image)
    }
}

export function getImageApiLink(name) {
    return process.env.REACT_APP_API_LINK + '/image/' + name
}