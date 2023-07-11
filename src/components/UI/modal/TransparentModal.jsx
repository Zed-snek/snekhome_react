import React from 'react';
import style from "./TransparentModal.module.css";
import {Modal} from "react-bootstrap";
import {useClasses} from "../../../hooks/useClasses";

function TransparentModal({visible, setVisible, children, className}) {

    const classes = useClasses(style.main, className)

    return (
        <Modal
            show={visible}
            onHide={() => setVisible(false)}
            centered
            className={classes.join(' ')}
        >
            <div className={style.modal}>
                <div className={style.cancel} onClick={() => setVisible(false)}>
                    ✗
                </div>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </Modal>
    );
}

export default TransparentModal;