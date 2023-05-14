import React from 'react';
import inputSt from './MyInput.module.css'

function MyInput({register, ...props}) { //using useForm()
    return (
        <input
            className={inputSt.input}
            {...register(props.name)}
            {...props}
        />
    );
}

export default MyInput;