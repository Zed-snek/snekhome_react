import {useClasses} from "../../../hooks/useClasses";
import style from "../buttons/MyBlurredButton.module.css";

function MyBlurredDiv({className, children, ...props}) {

    const classes = useClasses(style.onlyDiv, className)

    return (
        <div
            className={classes}
            {...props}
        >
            {children}
        </div>
    );
}

export default MyBlurredDiv;