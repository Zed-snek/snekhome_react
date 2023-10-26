import style from "./MyGreyOutlineButton.module.css";
import {useClasses} from "../../../hooks/useClasses";

function MyGreyOutlineButton({className, children, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <button
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}

export default MyGreyOutlineButton;