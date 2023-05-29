import defaultUserImage from "../images/defaultUserImage.png";
import defaultCommunityImage from "../images/defaultCommunityImage.png";

export function getUserImage(image) {
    if (!image)
        return defaultUserImage
    else
        return getImageApiLink(image)
}

export function getCommunityImage(images) {
    if (images.length === 0)
        return defaultCommunityImage
    else
        return getImageApiLink(images[images.size - 1])
}

export function getImageApiLink(name) {
    return process.env.REACT_APP_API_LINK + '/image/' + name
}