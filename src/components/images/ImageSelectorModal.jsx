import {useState} from 'react';
import {useImages} from "../../hooks/useImages";
import style from "./ImageSelectorModal.module.css";
import TransparentModal from "../UI/modal/TransparentModal";
import MyTransparentButton from "../UI/buttons/MyTransparentButton";
import {getCommunityImage, getUserImage} from "../../functions/linkFunctions";
import ArrowLeft from "../svg/ArrowLeft";
import ArrowRight from "../svg/ArrowRight";
import MyBlurredButton from "../UI/buttons/MyBlurredButton";
import MessageModal from "../UI/modal/MessageModal";
import MyBlurredDiv from "../UI/blocks/MyBlurredDiv";

function ImageSelectorModal({array, setArray, visible, setVisible, isDeletePermission, format}) { //formats: "user", "community"

    const [turnLeft, turnRight, currentImage, currentIndex, isShowArrows, deleteCurrentImage]
        = useImages(array, setArray)
    const [isDeleteModal, setIsDeleteModal] = useState(false)

    function showImage() {
        if (format === "user")
            return <img src={getUserImage(currentImage)} className={"bigUserImage"} alt=""/>
        if (format === "community")
            return <img src={getCommunityImage(currentImage)} className="bigUserImage" alt=""/>
    }

    return (
        <TransparentModal
            visible={visible}
            setVisible={setVisible}
            className={style.modal}
        >
            <div className={style.main}>
                <div>
                    { isShowArrows ?
                        <MyTransparentButton onClick={turnLeft} className={style.arrowBtn}>
                            <ArrowLeft />
                        </MyTransparentButton>
                    : <></> }
                </div>
                <div className={style.imageDiv}>
                    {showImage()}
                    <MyBlurredDiv className={style.imagesCount}>
                        { (currentIndex + 1) + '/' + array.length }
                    </MyBlurredDiv>
                    {
                        isDeletePermission ?
                            <div className={style.deleteBtn}>
                                <MyBlurredButton onClick={() => setIsDeleteModal(true)}>
                                    Delete
                                </MyBlurredButton>
                                <MessageModal
                                    visible={isDeleteModal}
                                    setVisible={setIsDeleteModal}
                                    acceptCallback={deleteCurrentImage}
                                >
                                    Are you sure you want to delete the image?
                                </MessageModal>
                            </div>
                            : <></>
                    }
                </div>
                <div>
                    { isShowArrows ?
                        <MyTransparentButton onClick={turnRight} className={style.arrowBtn}>
                            <ArrowRight />
                        </MyTransparentButton>
                    : <></> }
                </div>
            </div>
        </TransparentModal>
    );
}

export default ImageSelectorModal;