import React from 'react';
import style from "./CommunityRoleFlair.module.css"

function CommunityRoleFlair({title, textColor, color}) {
    return (
        <div className="flexDiv">
            <div
                style={{
                    color: textColor,
                    backgroundColor: color
                }}
                className={style.main}
            >
                {title}
            </div>
        </div>
    );
}

export default CommunityRoleFlair;