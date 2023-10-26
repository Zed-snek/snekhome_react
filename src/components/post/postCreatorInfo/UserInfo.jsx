import style from "./PostCreatorInfo.module.css";
import CommunityRoleFlair from "../../community/CommunityRoleFlair";
import {useNavigate} from "react-router-dom";
import anonImage from "../../../images/defaultUserImage.png";

function UserInfo({image, nickname, flair, isAnon}) {

    const navigate = useNavigate()

    function goNav() {
        if (!isAnon)
            navigate("/u/" + nickname)
    }

    return (
        <div className={style.main + " " + (isAnon ? style.disabled : style.active)} onClick={goNav}>
            <div>
                <img src={isAnon ? anonImage : image} className={"userImage"} alt=""/>
            </div>

            <div>
                <div className={style.nickname}>
                    {nickname}
                </div>

                <div>
                    { flair ?
                        <div className={style.flairDiv}>
                            <CommunityRoleFlair
                                title={flair.title}
                                textColor={flair.textColor}
                                bannerColor={flair.bannerColor}
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