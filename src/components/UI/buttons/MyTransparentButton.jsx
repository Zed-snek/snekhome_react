import React from 'react';
import style from './MyTransparentButton.module.css';
import tooltipStyle from "../../../styles/tooltip.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MyTransparentButton({children, className, tooltip, ...props}) {

    const classes = useClasses(style.main, className) + ' ' + tooltipStyle.main

    return (
        <button className={classes} {...props}>
            {children}
            {tooltip
                ? <div className={tooltipStyle.tooltip}>{tooltip}</div>
                : <></>
            }
        </button>
    );
}

export default MyTransparentButton;