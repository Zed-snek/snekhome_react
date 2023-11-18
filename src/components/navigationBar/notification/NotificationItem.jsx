import style from "./Notification.module.css";
import {getNotificationContent} from "./getNotificationContent";

function NotificationItem({notification}) {

    return (
        <div className={style.itemMainBorderBottom}>
            <div className={style.itemMain}>
                {getNotificationContent(notification)}
            </div>
        </div>
    );
}

export default NotificationItem;