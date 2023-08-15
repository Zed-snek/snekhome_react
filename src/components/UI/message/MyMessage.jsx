import React from 'react';
import style from './MyMessage.module.css'
import {useClasses} from "../../../hooks/useClasses";

function MyMessage({children, className, ...props}) {

    let classes = useClasses(style.message, className)
    if (!children)
        classes += ' ' + style.displayNone

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default MyMessage;
