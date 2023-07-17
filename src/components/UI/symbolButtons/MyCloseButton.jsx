import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./MyCloseButton.module.css";

function MyCloseButton({className, ...props}) {
    const classes = useClasses(style.main, className)

    return (
        <div
            className={classes}
            {...props}
        >
            ✗
        </div>
    );
}

export default MyCloseButton;