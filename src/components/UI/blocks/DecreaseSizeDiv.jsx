import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./DecreaseSizeDiv.module.css";

function DecreaseSizeDiv({children, className, ...props}) {

    const classes = useClasses(style.main, className)

    const sizes = {
        px25: style.px25,
        px20: style.px20
    }
    classes.push(sizes[props.size] ?? sizes.px20) /* Nullish coalescing operator "??" */

    return (
        <div {...props} className={classes.join(' ')}>
            {children}
        </div>
    );
}

export default DecreaseSizeDiv;