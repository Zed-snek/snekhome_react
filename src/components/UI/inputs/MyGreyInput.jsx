import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from './MyGreyInput.module.css';
import MyInput from "./MyInput";

function MyGreyInput({className, onChange, ...props}) { //without useForm()

    const classes = useClasses(style.main, className)

    return (
        <MyInput
            className={classes.join(' ')}
            onChange={event => onChange(event)}
            {...props}
        />
    );
}

export default MyGreyInput;