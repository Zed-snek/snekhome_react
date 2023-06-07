import defaultUserImage from "../images/defaultUserImage.png";
import defaultCommunityImage from "../images/defaultCommunityImage.png";

export function getImageApiLink(name) {
    return process.env.REACT_APP_API_LINK + '/image/' + name
}

export function getUserImage(image) {
    if (!image)
        return defaultUserImage
    else
        return getImageApiLink(image)
}

export function getCommunityImageByArray(images) {
    if (images.length === 0)
        return defaultCommunityImage
    else
        return getImageApiLink(images[images.length - 1].name)
}
export function getCommunityImage(image) {
    if (!image)
        return defaultCommunityImage
    else
        return getImageApiLink(image)
}

