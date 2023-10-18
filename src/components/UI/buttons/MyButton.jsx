import buttonStyle from './MyButton.module.css';
import {useClasses} from "../../../hooks/useClasses";

function MyButton({children, className, color, disabled, ...props}) {

    let classes = useClasses(buttonStyle.button, className)

    const styleObject = {
        width: props.width
    }

    const colors = {
        green: buttonStyle.green,
        blue: buttonStyle.blue,
        red: buttonStyle.red,
        orange: buttonStyle.orange,
    }
    if (disabled)
        classes += ' ' + buttonStyle.grey
    else
        classes += ' ' + (colors[color] ?? colors.blue) /* Nullish coalescing operator "??" */

    return (
        <button
            className={classes}
            style={styleObject}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default MyButton;

