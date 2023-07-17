import React from 'react';
import style from './InfoDiv.module.css'
import {useClasses} from "../../../hooks/useClasses";

function InfoDiv({children, className, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default InfoDiv;