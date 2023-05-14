import React from 'react';
import style from './MyMessage.module.css'

function MyMessage({children, ...props}) {

    const classes = [style.message]
    if (!children) {
        classes.push(style.displayNone)
    }

    return (
        <div className={classes.join(' ')} {...props}>
            {children}
        </div>
    );
}

export default MyMessage;
