import React, {useState} from 'react';
import style from "./ClosedCommunityPage.module.css";
import communityPage from "./CommunityPage.module.css";
import MyButton from "../../components/UI/buttons/MyButton";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import {useFetching} from "../../hooks/useFetching";
import MyMessage from "../../components/UI/message/MyMessage";
import MyPulseLoader from "../../components/UI/loaders/MyPulseLoader";
import CommunityService from "../../API/CommunityService";

function ClosedCommunityPage({image, groupname, name, nameColor, typeImage, isRequestSent}) {

    const [buttonStatus, setButtonStatus] = useState(isRequestSent)

    const [fetchRequest, isRequestLoading, requestError] = useFetching(async () => {
        await CommunityService.manageJoinRequest(groupname)
        setButtonStatus(prev => !prev)
    })

    return (
        <div className={style.main}>
            <div className={style.content}>
                <h2 className={style.h2}>
                    Oopps... Community is closed
                </h2>
                <InfoDiv className={style.community}>
                    <div>
                        <div className={communityPage.imgDiv}>
                            <img src={image} alt=""/>
                        </div>
                        <div className={communityPage.groupname}>
                            @{groupname}
                        </div>
                    </div>
                    <div className={style.nickname}>
                        <div className={communityPage.titleDiv}>
                                <span style={{color: nameColor}}>
                                    {name}
                                </span>
                            <img
                                src={typeImage}
                                className={communityPage.typeIcon}
                                alt=""
                            />
                        </div>
                    </div>
                </InfoDiv>
                <div className={style.text}>
                    To send request to join the community, click the button below
                </div>
                <MyMessage>
                    {requestError}
                </MyMessage>

                <MyButton
                    className={style.button}
                    onClick={() => fetchRequest()}
                >
                    { isRequestLoading
                        ? <MyPulseLoader color="#E3E3E3" size={7}/>
                        : buttonStatus ? "Cancel request" : "Send request"
                    }
                </MyButton>
            </div>
        </div>
    );
}

export default ClosedCommunityPage;