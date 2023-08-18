import style from "./PostCreatorInfo.module.css";
import {useNavigate} from "react-router-dom";

function CommunityInfo({image, groupname, title}) {
    const navigate = useNavigate()

    return (
        <div className={style.main} onClick={() => {navigate('/c/' + groupname)}}>
            <div>
                <img src={image} className={"userImage " + style.image} alt=""/>
            </div>
            <div className={style.nicknameAndFlairDiv}>
                <div className={style.groupTitle}>
                    {title}
                </div>
                <div className={style.groupname}>
                    @{groupname}
                </div>
            </div>
        </div>
    );
}

export default CommunityInfo;