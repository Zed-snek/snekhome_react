import style from "../NavigationBar.module.css";
import NotificationBoxSvg from "../svg/NotificationBoxSvg";
import {useConnectNotification} from "./useConnectNotification";


function Notification({userNickname}) {

    useConnectNotification(userNickname)

    return (
        <button className={style.notificationButton}>
            <NotificationBoxSvg />
        </button>
    );
}

export default Notification;