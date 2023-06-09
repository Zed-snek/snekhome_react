import React from 'react';
import style from "./MySortButton.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MySortButton({children, className, isActive, ...props}) {

    const classes = useClasses(style.btn, className)
    if (isActive)
        classes.push(style.btn_current)

    return (
        <div className={classes.join(' ')} {...props}>
            {children}
        </div>
    );
}

export default MySortButton;