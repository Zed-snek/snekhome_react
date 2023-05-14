import React from 'react';
import style from './MyTransparentButton.module.css'
import {useClasses} from "../../../hooks/useClasses";

function MyTransparentButton({children, className, tooltip, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <button className={classes.join(' ')} {...props}>
            {children}
            {tooltip
                ? <div className={style.tooltip}>{tooltip}</div>
                : <></>
            }
        </button>
    );
}

export default MyTransparentButton;