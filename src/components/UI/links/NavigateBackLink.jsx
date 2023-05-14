import React from 'react';
import {useNavigate} from "react-router-dom";
import style from "./MyTextLink.module.css"

function NavigateBackLink({children, navigate, ...props}) {

    const nav = useNavigate()
    function handle() {
        nav(-1)
    }

    return (
        <div onClick={handle} className={style.link} {...props}>
            {children}
        </div>
    );
}

export default NavigateBackLink;