import style from './MyTextArea.module.css'
import {useClasses} from "../../../hooks/useClasses";

function MyTextArea({className, onChange, value, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <textarea
            value={value}
            className={classes}
            {...props}
            onChange={event => onChange(event)}
        />
    );
}

export default MyTextArea;