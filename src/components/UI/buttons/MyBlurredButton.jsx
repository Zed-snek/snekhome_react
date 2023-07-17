import React from 'react';
import style from "./MyBlurredButton.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MyBlurredButton({className, children, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <button
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}

export default MyBlurredButton;