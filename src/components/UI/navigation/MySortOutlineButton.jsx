import React from 'react';
import style from "./MySortButton.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MySortOutlineButton({children, className, isActive, ...props}) {

    let classes = useClasses(style.outlineBtn, className)
    if (isActive)
        classes += ' ' + style.outlineBtn_current

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default MySortOutlineButton;