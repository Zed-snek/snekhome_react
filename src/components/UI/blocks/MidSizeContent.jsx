import React from 'react';
import style from "./MidSizeContent.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MidSizeContent({children, className, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <div className={classes.join(' ')}>
            <div className={style.content}>
                {children}
            </div>
        </div>
    );
}

export default MidSizeContent;