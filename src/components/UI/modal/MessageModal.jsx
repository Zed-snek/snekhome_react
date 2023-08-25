import Modal from "react-bootstrap/Modal";
import style from "./MessageModal.module.css"
import MyButton from "../buttons/MyButton";
import {useNavigate} from "react-router-dom";

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
        <Modal show={visible} onHide={onHide}>
            <div className={style.modalBody + " own_bg_colorHeader"}>
                <Modal.Body className="bg-transparent">

                    <span className={style.span}>
                        {children}
                    </span>

                    <MyButton
                        className={style.closeBtn}
                        onClick={onHide}
                        float={'right'}
                        color={acceptCallback ? "red" : "blue"}
                    >
                        Close
                    </MyButton>
                    { acceptCallback ?
                        <MyButton
                            onClick={onAccept}
                            float={'right'}
                        >
                            Accept
                        </MyButton>
                    : <></> }

                </Modal.Body>
            </div>
        </Modal>
    );
}

export default MessageModal;