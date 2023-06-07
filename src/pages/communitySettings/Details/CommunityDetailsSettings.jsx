import React, {useEffect, useState} from 'react';
import style from "./CommunityDetailsSettings.module.css";
import EditInput from "../../userSettings/Account/EditInput";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import {isObjectNotEmpty} from "../../../functions/objectFunctions";
import MyFileInput from "../../../components/UI/inputs/MyFileInput";
import FadingMessage from "../../../components/UI/message/FadingMessage";
import HomePageCardItem from "../../homePage/HomePageCardItem";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import buttonStyle from '../../../components/UI/buttons/MyButton.module.css';

function CommunityDetailsSettings({groupname, name, description, setError, setIsLoader, setData, image, data}) {

    const [updateData, setUpdateData] = useState({})

    const [fetchUpdate, isUpdateLoading, updateError] = useFetching(async () => {
        if (updateData.image) {
            let response = await CommunityService.newImage(updateData.image, groupname)
            setData(prev => ({...prev, community: {...prev.community, images: [...prev.community.images, {name: response.message}] }}))
        }
        else {
            await CommunityService.updateCommunityDetails({...updateData, oldGroupname: groupname})
            if (updateData.name)
                setData(prev => ({...prev, community: {...prev.community, name: updateData.name}}))
            else if (updateData.groupname)
                setData(prev => ({...prev, community: {...prev.community, groupname: updateData.groupname}}))
            else if (updateData.description)
                setData(prev => ({...prev, community: {...prev.community, description: updateData.description}}))
        }
    })

    function updateValue(newValue) {
        setUpdateData( ({[newValue.name]: newValue.value}) )
    }
    useEffect(() => {
        if (isObjectNotEmpty(updateData))
            fetchUpdate()
    }, [updateData])

    useEffect(() => {
        if (updateError)
            setError(updateError)
    }, [updateError])
    useEffect(() => {
        setIsLoader(isUpdateLoading)
    }, [isUpdateLoading])

    const [showError, setShowError] = useState(false) //file too big error

    return (
        <div>
            <BorderBottomDiv>
                <EditInput
                    current={name}
                    name="name"
                    maxLength={25}
                    callback={updateValue}
                >
                    name:
                </EditInput>
                <EditInput
                    current={groupname}
                    name="groupname"
                    maxLength={18}
                    callback={updateValue}
                >
                    groupname:
                </EditInput>
                <EditInput
                    className={style.textArea}
                    current={description}
                    name="description"
                    maxLength={512}
                    isTextArea={true}
                    callback={updateValue}
                >
                    description:
                </EditInput>
            </BorderBottomDiv>


            <div>
                <div className="flexDiv">
                    <MyFileInput
                        className={buttonStyle.button + ' ' + buttonStyle.blue + ' ' + style.fileBtn}
                        maxSize={5}
                        accept="image/png, image/jpeg, image/gif"
                        setIsShow={setShowError}
                        setImage={updateValue}
                    >
                        Change image
                    </MyFileInput>
                </div>
                <div className={style.fadingMessageDiv}>
                    <FadingMessage
                        className={style.fadingMessage}
                        setIsShow={setShowError}
                        isShow={showError}
                    >
                        File is too big, <br/>
                        max size allowed 5mb
                    </FadingMessage>
                </div>



                <div className={style.sizeExamples}>
                    <div className={style.imageExample}>
                        <div className={style.titleSizeExample}>
                            Card from Home Page
                        </div>
                        <HomePageCardItem
                            title={groupname}
                            image={image}
                        />
                    </div>
                    <div className={style.imageExample}>
                        <div className={style.titleSizeExample}>
                            Image from Community Page
                        </div>
                        <img src={image} className={style.communityPageImage} alt=""/>
                    </div>
                    <div className={style.imageExample}>
                        <div className={style.titleSizeExample}>
                            Small image, used in posts
                        </div>
                        <img src={image} className="userImage" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetailsSettings;