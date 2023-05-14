import React from 'react';
import Modal from "react-bootstrap/Modal";
import style from "./MessageModal.module.css"
import MyButton from "../buttons/MyButton";
import {useNavigate} from "react-router-dom";

function MessageModal(props) {

    const navigate = useNavigate()

    function onHide() {
        props.setVisible(false)

        if (props.navigate)
            navigate(props.navigate)
    }

    function onAccept() {
        props.acceptCallback()
    }

    return (

        <Modal
            show={props.visible}
            onHide={onHide}
        >

            <div className={style.modalBody + " own_bg_colorHeader"}>

                <Modal.Body className="bg-transparent">
                    <span className={style.span}>
                        {props.children}
                    </span>

                    {props.isAcceptButton
                        ? <>
                            <MyButton
                                className={style.closeBtn}
                                onClick={onHide}
                                float={'right'}
                                color={'red'}
                            >Close
                            </MyButton>
                            <MyButton
                                onClick={onAccept}
                                float={'right'}
                            > Accept </MyButton>
                        </>
                        : <MyButton onClick={onHide} float={'right'}>Close</MyButton>
                    }

                </Modal.Body>


            </div>

        </Modal>
    );
}

export default MessageModal;