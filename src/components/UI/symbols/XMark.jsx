import style from "./symbols.module.css";
import {useClasses} from "../../../hooks/useClasses";

function XMark({className}) {
    const classes = useClasses(style.xMark, className)

    return (
        <span className={classes}>✗</span>
    );
}

export default XMark;