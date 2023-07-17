import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./OutlineFilledDiv.module.css";

function OutlineFilledDiv({className, children, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <div
            className={classes}
            {...props}
        >
            {children}
        </div>
    );
}

export default OutlineFilledDiv;