import style from "./Notification.module.css";
import {useEffect, useRef, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";

function NotificationWindow({isNotificationsWindowOpen, setNotificationsWindowOpen, buttonRef,
                                notifications, setNotifications
}) {

    const [page, setPage] = useState(0)
    const [hasLoaded, setHasLoaded] = useState(false)

    const [fetchNotifications, isNotificationsLoading, notificationsError] = useFetching(async () => {
        let responseData
        if (!hasLoaded) {
            responseData = await UserService.getNotifications(page, 5)
            setHasLoaded(true)
        }
        else {
            responseData = await UserService.getNotifications(page, 15)
        }

        if (notifications.length === 5)
            setNotifications(responseData)
        else
            setNotifications(prev => [...prev, ...responseData])
    })

    const ref = useRef(null)

    function handleClickOutside(event) {
        if (!(ref.current.contains(event.target) || buttonRef.current.contains(event.target)))
            setNotificationsWindowOpen(false)
    }

    useEffect(() => {
        if (isNotificationsWindowOpen)
            document.addEventListener('click', handleClickOutside, true)
        if (!hasLoaded)
            fetchNotifications()
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [isNotificationsWindowOpen]);


    if (isNotificationsWindowOpen)
        return (
            <div className={style.windowMain} ref={ref} >
                <h2>
                    Notification Window
                </h2>
                { notifications.map((n, index) =>
                    <div key={index}>
                        {n.type}
                    </div>
                )}
            </div>
        );
    else
        return <></>
}

export default NotificationWindow;