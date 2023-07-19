import React from 'react';
import {useSVG} from "../../../hooks/useSVG";

function SendSvg({width, height, color}) {

    const [w, h, c] = useSVG(26, 24, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2881 13.6499L15.08 10.0599M8.41777 6.31991L17.4101 3.48991C21.4456 2.21991 23.6381 4.29991
            22.3035 8.10991L19.3061 16.5999C17.2936 22.3099 13.989 22.3099 11.9766 16.5999L11.0869 14.0799L8.41777
            13.2399C2.3699 11.3399 2.3699 8.22991 8.41777 6.31991Z"
                  stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
}

export default SendSvg;