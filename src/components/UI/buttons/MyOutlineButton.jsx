import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./MyOutlineButton.module.css";

function MyOutlineButton({className, children, disabled,...props}) {

    let classes = useClasses(style.main, className)
    if (disabled)
        classes += ' ' + style.disabled
    else
        classes += ' ' + style.notDisabled

    return (
        <button
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}

export default MyOutlineButton;