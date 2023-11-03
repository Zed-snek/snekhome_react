import style from "./Notification.module.css";
import {useEffect, useRef} from "react";

function NotificationWindow({isNotificationsWindowOpen, setNotificationsWindowOpen, buttonRef}) {

    const ref = useRef(null);

    function handleClickOutside(event) {
        if (!(ref.current.contains(event.target) || buttonRef.current.contains(event.target)))
            setNotificationsWindowOpen(false)
    }

    useEffect(() => {
        if (isNotificationsWindowOpen)
            document.addEventListener('click', handleClickOutside, true)

        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [isNotificationsWindowOpen]);


    if (isNotificationsWindowOpen)
        return (
            <div className={style.windowMain} ref={ref} >
                <h2>
                    Notification Window
                </h2>
            </div>
        );
    else
        return <></>
}

export default NotificationWindow;