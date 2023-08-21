import React from 'react';
import style from "./ImageModal.module.css";
import TransparentModal from "../UI/modal/TransparentModal";

function ImageModal({isOpened, setIsOpened, src}) {

    return (
        <TransparentModal
            visible={isOpened}
            setVisible={setIsOpened}
            className={style.modal}
        >
            <img
                className={style.image}
                src={src}
                alt=""
            />
        </TransparentModal>
    );
}

export default ImageModal;