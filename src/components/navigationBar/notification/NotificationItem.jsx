import style from "./Notification.module.css";
import {getNotificationContent} from "./getNotificationContent";
import {formatDate} from "../../../utils/timeDateFunctions";

function NotificationItem({notification}) {

    return (
        <div className={style.itemMainBorderBottom}>
            <div className={style.itemMain}>
                {getNotificationContent(notification)}
                <div className={style.itemDate}>
                    {formatDate(notification.date)}
                </div>
            </div>
        </div>
    );
}

export default NotificationItem;