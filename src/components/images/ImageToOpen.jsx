import React, {useState} from 'react';
import style from "./ImageToOpen.module.css";
import TransparentModal from "../UI/modal/TransparentModal";
import MyCloseButton from "../UI/symbolButtons/MyCloseButton";

function ImageToOpen({maxHeight, maxWidth, image, toRemove}) {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div>
            <div className={style.imageIcoDiv}>
                <img
                    className={style.imageIco}
                    style={{maxHeight: maxHeight + "px", maxWidth: maxWidth + "px"}}
                    src={image}
                    onClick={() => setIsOpened(true)}
                    alt=""
                />
                { toRemove
                    ? <MyCloseButton
                        className={style.removeBtn}
                        onClick={toRemove}
                    />
                    : <></>}
            </div>

            <TransparentModal
                visible={isOpened}
                setVisible={setIsOpened}
                className={style.modal}
            >
                <img
                    className={style.image}
                    src={image}
                    alt=""
                />
            </TransparentModal>

        </div>
    );
}

export default ImageToOpen;