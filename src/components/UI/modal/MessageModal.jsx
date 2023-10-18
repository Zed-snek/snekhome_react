import style from "./MessageModal.module.css"
import MyButton from "../buttons/MyButton";
import {useNavigate} from "react-router-dom";
import TransparentModal from "./TransparentModal";

function MessageModal({visible, setVisible, children, acceptCallback, navigate}) {

    const doNavigate = useNavigate()

    function onHide() {
        setVisible(false)
        if (navigate)
            doNavigate(navigate)
    }

    function onAccept() {
        acceptCallback()
        setVisible(false)
    }

    return (
        <TransparentModal
            visible={visible}
            setVisible={setVisible}
            centered={false}
            isCloseBtn={false}
            className={style.main}
        >
            {children}

            <div className={style.buttons}>
                { acceptCallback ?
                    <MyButton
                        onClick={onAccept}
                    >
                        Accept
                    </MyButton>
                : <></> }

                <MyButton
                    className={style.closeBtn}
                    onClick={onHide}
                    color={acceptCallback ? "red" : "blue"}
                >
                    Close
                </MyButton>
            </div>
        </TransparentModal>
    );
}

export default MessageModal;