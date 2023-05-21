import React from 'react';
import inputSt from './MyInput.module.css'

function MyInput({register, name, ...props}) { //using useForm()
    return (
        <input
            className={inputSt.input}
            {...register(name)}
            {...props}
        />
    );
}

export default MyInput;