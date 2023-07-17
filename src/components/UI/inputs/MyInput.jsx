import React from 'react';
import inputSt from './MyInput.module.css'
import {useClasses} from "../../../hooks/useClasses";

function MyInput({register, name, className, onChange, ...props}) { //using useForm()
    const classes = useClasses(inputSt.input, className)

    if (register)
        return (
            <input
                className={classes}
                {...register(name)}
                {...props}
            />
        );
    else
        return (
            <input
                className={classes}
                onChange={event => onChange(event)}
                {...props}
            />
        );
}

export default MyInput;