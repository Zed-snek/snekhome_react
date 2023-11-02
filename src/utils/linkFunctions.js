import defaultUserImage from "../images/defaultUserImage.png";
import defaultCommunityImage from "../images/defaultCommunityImage.png";
import {Link} from "react-router-dom";
import style from "./Utils.module.css";


export function linkToUser(nickname) {
    return <Link to={"/u/" + nickname} className={style.linkToUser}>@{nickname}</Link>
}
export function linkToCommunity(groupname) {
    return <Link to={"/c/" + groupname} className={style.linkToUser}>@{groupname}</Link>
}
export function linkToPost(postId) {
    return <Link to={"/post/" + postId} className={style.linkToUser}>post</Link>
}


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


