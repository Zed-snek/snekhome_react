import React, {useState} from 'react';
import style from "./PostImageSelector.module.css";
import btnStyle from "../images/ImageSelectorModal.module.css";
import {useImages} from "../../hooks/useImages";
import {getImage} from "../../functions/linkFunctions";
import MyTransparentButton from "../UI/buttons/MyTransparentButton";
import ArrowLeft from "../svg/ArrowLeft";
import ArrowRight from "../svg/ArrowRight";
import {useClasses} from "../../hooks/useClasses";
import MyBlurredDiv from "../UI/blocks/MyBlurredDiv";
import ImageModal from "./ImageModal";

function PostImagesSelector({images, isImageForm, isFlexForm, width, height, className, imgClassName}) {

    const [turnLeft, turnRight, currentImage, currentIndex, isShowArrows]
        = useImages(images, null, true)

    const classes = useClasses(style.main, className)
    const imageClasses = useClasses(style.image, imgClassName)

    const [isImageModal, setIsImageModal] = useState(false)
    const [imgRatio, setImgRatio] = useState(0.0)

    const link = getImage("", currentImage)
    const img = document.createElement("img")
    img.src = link
    img.onload = () => {
        setImgRatio(img.naturalHeight / img.naturalWidth)
    }

    function getImageStyle() {
        if (isImageForm || (isFlexForm && imgRatio > 0.75))
            return {maxWidth: width + "px", height: height + "px", objectFit: "contain"}
        return {width: width + "px", height: height + "px", objectFit: "cover"}
    }

    return (
        <div className={classes}>
            <div>
                <img
                    src={link} alt=""
                    style={getImageStyle()}
                    className={imageClasses}
                    onClick={() => setIsImageModal(true)}
                />
            </div>
            { isShowArrows ?
                <>
                    <div className={style.btnDiv + " " + style.leftBtn}>
                        <MyTransparentButton onClick={turnLeft} className={btnStyle.arrowBtn}>
                            <ArrowLeft/>
                        </MyTransparentButton>

                    </div>
                    <div className={style.btnDiv + " " + style.rightBtn}>
                        <MyTransparentButton onClick={turnRight} className={btnStyle.arrowBtn}>
                            <ArrowRight/>
                        </MyTransparentButton>
                    </div>
                    <MyBlurredDiv className={style.btnDiv + " " + style.imageCount}>
                        {currentIndex + 1 + '/' + images.length}
                    </MyBlurredDiv>
                </>
                : <></> }
            <ImageModal
                isOpened={isImageModal}
                setIsOpened={setIsImageModal}
                src={link}
            />
        </div>
    );
}

export default PostImagesSelector;