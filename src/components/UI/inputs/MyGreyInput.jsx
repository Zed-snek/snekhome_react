import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import MyInputOld from "./MyInputOld";
import style from './MyGreyInput.module.css';

function MyGreyInput({className, onChange, ...props}) { //without useForm()

    const classes = useClasses(style.main, className)

    return (
        <MyInputOld
            className={classes.join(' ')}
            onChange={event => onChange(event)}
            {...props}
        />
    );
}

export default MyGreyInput;