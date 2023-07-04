import React from 'react';
import style from "./TransparentModal.module.css";
import {Modal} from "react-bootstrap";

function TransparentModal({visible, setVisible, children}) {

    return (
        <Modal
            show={visible}
            onHide={() => setVisible(false)}
            centered
            className={style.main}
        >
            <div className={style.modal}>
                <div className={style.cancel} onClick={() => setVisible(false)}>
                    ✗
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Modal>
    );
}

export default TransparentModal;