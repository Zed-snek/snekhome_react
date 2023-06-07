import React from 'react';
import style from "./ClosedCommunityPage.module.css";
import communityPage from "./CommunityPage.module.css";
import MyButton from "../../components/UI/buttons/MyButton";
import InfoDiv from "../../components/UI/blocks/InfoDiv";

function ClosedCommunityPage({image, groupname, name, nameColor, typeImage}) {

    return (
        <div className={style.main}>
            <div className={style.content}>
                <h2 className={style.h2}>
                    Oopps... Community is closed
                </h2>
                <InfoDiv className={style.community}>
                    <div>
                        <div className={communityPage.imgDiv}>
                            <img src={image} />
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
                <MyButton className={style.button}>
                    Send request
                </MyButton>
            </div>
        </div>
    );
}

export default ClosedCommunityPage;