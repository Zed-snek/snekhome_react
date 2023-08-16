import React from 'react';
import style from "./PostCreatorInfo.module.css";
import CommunityRoleFlair from "../../community/CommunityRoleFlair";
import {useNavigate} from "react-router-dom";

function UserInfo({image, nickname, flair}) {

    const navigate = useNavigate()

    return (
        <div className={style.main} onClick={() => {navigate('/u/' + nickname)}}>
            <div>
                <img src={image} className={"userImage " + style.image} alt=""/>
            </div>
            <div className={style.nicknameAndFlairDiv}>
                <div className={style.nickname}>
                    {nickname}
                </div>
                <div>
                    { flair ?
                        <div className={style.flairDiv}>
                            <CommunityRoleFlair
                                title={flair.title}
                                textColor={flair.textColor}
                                bannerColor={flair.color}
                            />
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserInfo;