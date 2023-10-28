import defaultUserImage from "../images/defaultUserImage.png";
import defaultCommunityImage from "../images/defaultCommunityImage.png";

export function getImageApiLink(name) {
    return process.env.REACT_APP_API_LINK + '/image/' + name
}

export function getImage(defaultImage, image) {
    if (!image)
        return defaultImage
    else
        return getImageApiLink(image)
}
export function getImageByArray(defaultImage, array) {
    if (array.length === 0)
        return defaultImage
    else
        return getImageApiLink(array[array.length - 1].name)
}

export function getUserImage(image) {
    return getImage(defaultUserImage, image)
}
export function getUserImageByArray(images) {
    return getImageByArray(defaultUserImage, images)
}

export function getCommunityImage(image) {
    return getImage(defaultCommunityImage, image)
}
export function getCommunityImageByArray(images) {
    return getImageByArray(defaultCommunityImage, images)
}


