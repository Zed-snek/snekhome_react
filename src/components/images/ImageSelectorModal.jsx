import React, {useState} from 'react';
import {useImages} from "../../hooks/useImages";
import style from "./ImageSelectorModal.module.css";
import TransparentModal from "../UI/modal/TransparentModal";
import MyTransparentButton from "../UI/buttons/MyTransparentButton";
import {getCommunityImage, getUserImage} from "../../functions/linkFunctions";
import ArrowLeft from "../UI/svg/ArrowLeft";
import ArrowRight from "../UI/svg/ArrowRight";
import MyBlurredButton from "../UI/buttons/MyBlurredButton";
import MessageModal from "../UI/modal/MessageModal";

function ImageSelectorModal({array, setArray, visible, setVisible, isDeletePermission, format}) { //formats: "user", "community"

    const [turnLeft, turnRight, currentImage, deleteCurrentImage] = useImages(array, setArray)
    const [isDeleteModal, setIsDeleteModal] = useState(false)

    function showImage() {
        if (format === "user")
            return <img src={getUserImage(currentImage)} className={"bigUserImage"}/>
        if (format === "community")
            return <img src={getCommunityImage(currentImage)} className="bigUserImage"/>
    }

    return (
        <TransparentModal
            visible={visible}
            setVisible={setVisible}
            className={style.modal}
        >
            <div className={style.main}>
                <div>
                    <MyTransparentButton onClick={turnLeft} className={style.arrowBtn}>
                        <ArrowLeft width={16} height={32} color="#E3E3E3"/>
                    </MyTransparentButton>
                </div>
                <div className={style.imageDiv}>
                    {showImage()}
                    {
                        isDeletePermission ?
                            <div className={style.deleteBtn}>
                                <MyBlurredButton onClick={() => setIsDeleteModal(true)}>
                                    Delete
                                </MyBlurredButton>
                                <MessageModal
                                    visible={isDeleteModal}
                                    setVisible={setIsDeleteModal}
                                    isAcceptButton={true}
                                    acceptCallback={deleteCurrentImage}
                                >
                                    Are you sure you want to delete the image?
                                </MessageModal>
                            </div>
                            : <></>
                    }
                </div>
                <div>
                    <MyTransparentButton onClick={turnRight} className={style.arrowBtn}>
                        <ArrowRight width={16} height={32} color="#E3E3E3"/>
                    </MyTransparentButton>
                </div>
            </div>
        </TransparentModal>
    );
}

export default ImageSelectorModal;