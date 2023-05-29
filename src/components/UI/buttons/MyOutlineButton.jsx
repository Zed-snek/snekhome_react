import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./MyOutlineButton.module.css";

function MyOutlineButton({className, children, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <button {...props} className={classes.join(' ')}>
            {children}
        </button>
    );
}

export default MyOutlineButton;