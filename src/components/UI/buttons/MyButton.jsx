import React from 'react';
import buttonStyle from './MyButton.module.css';
import {useClasses} from "../../../hooks/useClasses";

function MyButton({children, className, color, ...props}) {

    let classes = useClasses(buttonStyle.button, className)

    const styleObject = {
        width: props.width
    }
    if (props.float === "right")
        classes += ' ' + buttonStyle.floatRight


    const colors = {
        green: buttonStyle.green,
        blue: buttonStyle.blue,
        red: buttonStyle.red,
        orange: buttonStyle.orange,
    }
    classes += ' ' + (colors[color] ?? colors.blue) /* Nullish coalescing operator "??" */


    return (
        <button {...props} className={classes} style={styleObject}>
            {children}
        </button>
    );
}

export default MyButton;

