import React from 'react';
import style from './OutlineDiv.module.css'

function OutlineDiv({children, className, ...props}) {

    const classes = [style.outlined]

    if (className) {
        classes.push(className)
    }

    return (
        <div className={classes.join(' ')} {...props} >
            {children}
        </div>
    );
}

export default OutlineDiv;