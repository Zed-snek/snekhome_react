import React from 'react';
import style from "./CommunityRoleFlair.module.css"

function CommunityRoleFlair({title, textColor, color}) {
    return (
        <div
            style={{
                color: textColor,
                backgroundColor: color
            }}
            className={style.main}
        >
            {title}
        </div>
    );
}

export default CommunityRoleFlair;