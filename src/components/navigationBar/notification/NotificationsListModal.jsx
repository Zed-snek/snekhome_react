import style from "./Notification.module.css";
import {useState} from "react";
import TransparentModal from "../../UI/modal/TransparentModal";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import {usePaginateLoad} from "../../../hooks/usePaginateLoad";
import LoaderAndErrorDiv from "../../structureComponents/LoaderAndErrorDiv";

function NotificationsListModal({setIsModalOpen}) {

    const [notifications, setNotifications] = useState([])

    const [fetchNotifications, isNotificationsLoading, notificationsError] = useFetching(async () => {
        const responseData = await UserService.getNotifications(pageNumber, 15)
        setNotifications(prev => [...prev, ...responseData])

        if (responseData.length === 0)
            setCanLoad(false)
    })

    const [pageNumber, lastElement, setCanLoad] = usePaginateLoad(fetchNotifications, isNotificationsLoading)

    return (
        <TransparentModal
            visible={true}
            setVisible={setIsModalOpen}
            centered={false}
        >
            { notifications.map((n, index) =>
                <div key={index}>
                    {n.type}
                </div>
            )}

            <LoaderAndErrorDiv error={notificationsError} isLoading={isNotificationsLoading} />
            {lastElement} {/*element that triggers request*/}
        </TransparentModal>
    );
}

export default NotificationsListModal;