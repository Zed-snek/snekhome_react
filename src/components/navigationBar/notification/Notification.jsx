import navbarStyle from "../NavigationBar.module.css";
import style from "./Notification.module.css";
import NotificationBoxSvg from "../svg/NotificationBoxSvg";
import {useConnectNotification} from "./useConnectNotification";
import {useEffect, useState} from "react";
import FadingNotification from "./FadingNotification";


function Notification({userNickname}) {

    const lastNotification = useConnectNotification(userNickname)
    const [isShowNotification, setIsShowNotification] = useState(false)

    useEffect(() => {
        if (lastNotification)
            setIsShowNotification(true)
    }, [lastNotification])

    return (
        <div className={style.notificationDiv}>
            <button className={navbarStyle.notificationButton}>
                <NotificationBoxSvg />
            </button>

            { isShowNotification ?
                <FadingNotification
                    isShow={isShowNotification}
                    setIsShow={setIsShowNotification}
                    notification={lastNotification}
                />
            : <></> }
        </div>
    );
}

export default Notification;