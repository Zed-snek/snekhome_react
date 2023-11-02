import {useInterval} from "usehooks-ts";
import {useState} from "react";
import MyBlurredDiv from "../../UI/blocks/MyBlurredDiv";
import style from "./Notification.module.css";
import {getNotificationContent} from "./getNotificationContent";
import MyCloseButton from "../../UI/symbolButtons/MyCloseButton";


function FadingNotification({notification, isShow, setIsShow}) {

    const [transparent, setTransparent] = useState(1)

    useInterval(() => {
        if (transparent > 0.5) {
            setTransparent(transparent - 0.04)
        }
        else {
            setIsShow(false)
            setTransparent(1)
        }

    }, isShow ? 1000 : null)

    return (
        <MyBlurredDiv style={{opacity: transparent}} className={style.fadingNotification}>
            <MyCloseButton className={style.closeBtn} onClick={() => setIsShow(false)} />
            {getNotificationContent(notification)}
        </MyBlurredDiv>
    );
}

export default FadingNotification;