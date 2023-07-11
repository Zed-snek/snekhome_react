import React, {useState} from 'react';
import style from "./ImageToOpen.module.css";
import TransparentModal from "../UI/modal/TransparentModal";

function ImageToOpen({maxHeight, maxWidth, image}) {

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div>
            <div>
                <img
                    className={style.imageIco}
                    style={{maxHeight: maxHeight + "px", maxWidth: maxWidth + "px"}}
                    src={image}
                    onClick={() => setIsOpened(true)}
                />
            </div>

            <TransparentModal
                visible={isOpened}
                setVisible={setIsOpened}
                className={style.modal}
            >
                <img
                    className={style.image}
                    src={image}
                />
            </TransparentModal>

        </div>
    );
}

export default ImageToOpen;