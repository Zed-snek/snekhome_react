import React from 'react';
import style from "./CommunityRoleFlair.module.css"

function CommunityRoleFlair({title, textColor, bannerColor}) {
    return (
        <div className="flexDiv">
            <div
                style={{
                    color: textColor,
                    backgroundColor: bannerColor
                }}
                className={style.main}
            >
                {title}
            </div>
        </div>
    );
}

export default CommunityRoleFlair;