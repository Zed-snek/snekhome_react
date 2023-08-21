import React, {useState} from 'react';
import style from "./ImageToOpen.module.css";
import MyCloseButton from "../UI/symbolButtons/MyCloseButton";
import ImageModal from "./ImageModal";

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
                { toRemove ?
                    <MyCloseButton
                        className={style.removeBtn}
                        onClick={toRemove}
                    />
                    : <></> }
            </div>

            <ImageModal
                isOpened={isOpened}
                setIsOpened={setIsOpened}
                src={image}
            />

        </div>
    );
}

export default ImageToOpen;