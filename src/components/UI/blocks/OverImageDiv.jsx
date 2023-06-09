import React from 'react';
import style from './OverImageDiv.module.css';
import {useClasses} from "../../../hooks/useClasses";

/*to work properly, parent's div must have position: relative; property*/
function OverImageDiv({children, className, sizeByLength, ...props}) {

    const classes = useClasses(style.main, className)

    if (sizeByLength) {
        if (children.length > 14)
            classes.push(style.px16)
        else
            classes.push(style.px20)
    }

    return (
        <div className={classes.join(' ')} {...props}>
            {children}
        </div>
    );
}

export default OverImageDiv;