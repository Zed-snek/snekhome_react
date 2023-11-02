import {useInterval} from "usehooks-ts";
import {useState} from "react";
import MyBlurredDiv from "../../UI/blocks/MyBlurredDiv";
import style from "./Notification.module.css";


function FadingNotification({notification, isShow, setIsShow}) {

    const [transparent, setTransparent] = useState(1)

    useInterval(() => {
        if (transparent > 0.3) {
            setTransparent(transparent - 0.04)
        }
        else {
            setIsShow(false)
            setTransparent(1)
        }

    }, isShow ? 300 : null)

    return (
        <MyBlurredDiv style={{opacity: transparent}} className={style.fadingNotification}>
            <div>
                {notification.type}
            </div>
        </MyBlurredDiv>
    );
}

export default FadingNotification;