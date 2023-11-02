import {linkToCommunity, linkToPost, linkToUser} from "../../../utils/linkFunctions";
import style from "./Notification.module.css";
import ellipsis from "../../../styles/ellipsis.module.css";


function commentaryReply(notification, isPostReplied) {
    return <div className={style.fadingNotificationContent + " " + ellipsis.main}>
        User {linkToUser(notification.nickname)}
        {isPostReplied ? "left commentary in your" : "replied to your commentary in"}
        <div>
            {linkToPost(notification.postId)}:
        </div>
        <div className={style.commentaryInNotification + " " + ellipsis.childrenClamp2}>
            {notification.message}
        </div>
    </div>
}

export function getNotificationContent(notification) {
    switch (notification.type) {
        case "ADD_FRIEND":
            return <div className={style.fadingNotificationContent}>
                User {linkToUser(notification.nickname)} added you to friend list
            </div>

        case "JOIN_INVITE":
            return <div className={style.fadingNotificationContent}>
                User {linkToUser(notification.nickname)} invites you to community {linkToCommunity(notification.groupname)}
            </div>

        case "COMMENT_REPLY":
            return commentaryReply(notification, false)

        case "POST_REPLY":
            return commentaryReply(notification, true)

        case "POST_UPVOTES":
            return <div className={style.fadingNotificationContent}>
                Your {linkToPost(notification.postId)} has got {notification.message} upvotes!
            </div>

        case "COMMENT_UPVOTES":
            return <div className={style.fadingNotificationContent}>
                Your commentary in {linkToPost(notification.postId)} has got {notification.message} upvotes!
            </div>

        case "BANNED_IN_COMMUNITY":
            return <div className={style.fadingNotificationContent}>
                You have been banned in community {linkToCommunity(notification.groupname)}
            </div>

        case "ELECTIONS_ENDED":
            return <div className={style.fadingNotificationContent}>
                Elections ended in community {linkToCommunity(notification.groupname)}
            </div>
    }
}