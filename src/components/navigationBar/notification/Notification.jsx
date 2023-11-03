import navbarStyle from "../NavigationBar.module.css";
import style from "./Notification.module.css";
import NotificationBoxSvg from "../svg/NotificationBoxSvg";
import {useConnectNotification} from "./useConnectNotification";
import {useEffect, useState, useRef} from "react";
import FadingNotification from "./FadingNotification";
import {useContext} from "react";
import {UserContext} from "../../context";
import NotificationWindow from "./NotificationWindow";


function Notification() {

    const {notificationsCount} = useContext(UserContext)
    const lastNotification = useConnectNotification()
    const [isShowNotification, setIsShowNotification] = useState(false)

    const buttonRef = useRef(null);
    const [isNotificationsWindowOpen, setNotificationsWindowOpen] = useState(false)

    useEffect(() => {
        if (lastNotification)
            setIsShowNotification(true)
    }, [lastNotification])

    return (
        <div className={style.notificationDiv}>
            <button
                className={navbarStyle.notificationButton}
                onClick={() => setNotificationsWindowOpen(prev => !prev)}
                ref={buttonRef}
            >
                <NotificationBoxSvg />

                { notificationsCount > 0 ?
                    <div className={style.notificationCount}>
                        { notificationsCount < 100 ? notificationsCount : "99+"}
                    </div>
                : <></> }
            </button>

            <NotificationWindow
                isNotificationsWindowOpen={isNotificationsWindowOpen}
                setNotificationsWindowOpen={setNotificationsWindowOpen}
                buttonRef={buttonRef}
            />

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