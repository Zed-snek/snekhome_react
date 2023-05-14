import React from 'react';
import inputSt from './MyInput.module.css'
import {useClasses} from "../../../hooks/useClasses";

function MyInputOld({className, onChange, ...props}) { //without useForm()

    const classes = useClasses(inputSt.input, className)

    return (
        <input
            className={classes.join(' ')}
            onChange={event => onChange(event)}
            {...props}
        />
    );
}

export default MyInputOld;