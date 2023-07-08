import React from 'react';
import style from "./MySortButton.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MySortOutlineButton({children, className, isActive, ...props}) {

    const classes = useClasses(style.outlineBtn, className)
    if (isActive)
        classes.push(style.outlineBtn_current)

    return (
        <div className={classes.join(' ')} {...props}>
            {children}
        </div>
    );
}

export default MySortOutlineButton;