import style from "./Notification.module.css";
import {useEffect, useRef, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import NotificationsListModal from "./NotificationsListModal";
import MyTransparentButton from "../../UI/buttons/MyTransparentButton";
import NotificationItem from "./NotificationItem";
import LoaderAndErrorDiv from "../../structureComponents/LoaderAndErrorDiv";

function NotificationWindow({isNotificationsWindowOpen, setNotificationsWindowOpen, buttonRef,
                                lastNotifications, setLastNotifications
}) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [hasLoaded, setHasLoaded] = useState(false)

    const [fetchNotifications, isNotificationsLoading, notificationsError] = useFetching(async () => {
        if (!hasLoaded) {
            const responseData = await UserService.getNotifications(0, 5)
            setLastNotifications(responseData)
            setHasLoaded(true)
        }
    })

    const thisRef = useRef(null)

    function handleClickOutside(event) {
        if (!(thisRef.current.contains(event.target) || buttonRef.current.contains(event.target)))
            setNotificationsWindowOpen(false)
    }

    useEffect(() => {
        if (isNotificationsWindowOpen) {
            document.addEventListener('click', handleClickOutside, true)
            if (isModalOpen)
                setIsModalOpen(false)
        }
        if (!hasLoaded)
            fetchNotifications()
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [isNotificationsWindowOpen]);



    return (
        <div ref={thisRef}>
            { isNotificationsWindowOpen ?
                <div className={style.windowMain}>
                    <div className={style.windowContent}>
                        { lastNotifications.map((n, index) =>
                            <NotificationItem key={index} notification={n} />
                        )}
                    </div>

                    <div className={style.windowLoaderError}>
                        <LoaderAndErrorDiv
                            isLoading={isNotificationsLoading}
                            error={notificationsError}
                            messageClassName={style.windowErrorMessage}
                        />
                    </div>

                    <MyTransparentButton
                        onClick={() => {
                            setIsModalOpen(true)
                            setNotificationsWindowOpen(false)
                        }}
                        className={style.showMoreBtn}
                    >
                        show more...
                    </MyTransparentButton>
                </div>
            : <></> }

            { isModalOpen ?
                <NotificationsListModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            : <></> }
        </div>
    );
}

export default NotificationWindow;