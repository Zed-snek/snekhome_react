import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./MyOutlineButton.module.css";

function MyOutlineButton({className, children, disabled,...props}) {

    const classes = useClasses(style.main, className)
    classes.push(disabled ? style.disabled : style.notDisabled)

    return (
        <button
            disabled={disabled}
            className={classes.join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}

export default MyOutlineButton;