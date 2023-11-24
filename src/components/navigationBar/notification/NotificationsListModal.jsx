import style from "./Notification.module.css";
import {useEffect, useState} from "react";
import TransparentModal from "../../UI/modal/TransparentModal";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import {usePaginateLoad} from "../../../hooks/usePaginateLoad";
import LoaderAndErrorDiv from "../../structureComponents/LoaderAndErrorDiv";
import NotificationItem from "./NotificationItem";
import {Modal} from "react-bootstrap";

function NotificationsListModal({setIsModalOpen, ...props}) {

    const [notifications, setNotifications] = useState([])

    const [fetchNotifications, isNotificationsLoading, notificationsError] = useFetching(async () => {
        const responseData = await UserService.getNotifications(pageNumber, 15)
        setNotifications(prev => [...prev, ...responseData])

        if (responseData.length === 0)
            setCanLoad(false)
    })

    useEffect(() => {
        if (notificationsError)
            setCanLoad(false)
    }, [notificationsError])

    const [pageNumber, lastElement, setCanLoad] = usePaginateLoad(fetchNotifications, isNotificationsLoading)

    return (
        <TransparentModal
            visible={true}
            setVisible={setIsModalOpen}
            centered={false}
            {...props}
        >
            <Modal.Header className={style.modalHeader}>
                Notifications:
            </Modal.Header>

            <div>
                { notifications.map((n, index) =>
                    <NotificationItem key={index} notification={n} />
                )}
            </div>

            { notificationsError ? <br/> : <></> }
            <LoaderAndErrorDiv error={notificationsError} isLoading={isNotificationsLoading} />

            {lastElement} {/*element that triggers request*/}
        </TransparentModal>
    );
}

export default NotificationsListModal;