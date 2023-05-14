import React from 'react';
import style from './MyTextArea.module.css'
import {useClasses} from "../../../hooks/useClasses";

function MyTextArea({className, onChange, children, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <textarea
            className={classes.join(' ')}
            {...props}
            onChange={event => onChange(event)}
        >
            {children}
        </textarea>
    );
}

export default MyTextArea;