import style from './MyDarkTextArea.module.css';
import MyTextArea from "./MyTextArea";
import {useClasses} from "../../../hooks/useClasses";

function MyDarkTextArea({className, onChange, ...props}) {
    const classes = useClasses(style.main, className)

    return <MyTextArea
            className={classes}
            onChange={onChange}
            {...props}
        />
}

export default MyDarkTextArea;