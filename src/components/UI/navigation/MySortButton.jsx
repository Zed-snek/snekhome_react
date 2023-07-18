import React from 'react';
import style from "./MySortButton.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MySortButton({children, className, isActive, ...props}) {

    let classes = useClasses(style.btn, className)
    if (isActive)
        classes += ' ' + style.btn_current

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default MySortButton;