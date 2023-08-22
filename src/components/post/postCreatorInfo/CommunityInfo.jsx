import style from "./PostCreatorInfo.module.css";
import {useNavigate} from "react-router-dom";

function CommunityInfo({image, groupname, title}) {
    const navigate = useNavigate()

    return (
        <div
            className={style.main + " " + style.active}
            onClick={() => {navigate('/c/' + groupname)}}
        >
            <div>
                <img src={image} className={"userImage "} alt=""/>
            </div>
            <div>
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