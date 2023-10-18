import style from "./symbols.module.css";
import {useClasses} from "../../../hooks/useClasses";

function CheckMark({className}) {
    const classes = useClasses(style.checkMark, className)

    return (
        <span className={classes}>✓</span>
    );
}

export default CheckMark;
