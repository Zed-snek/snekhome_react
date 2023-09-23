import style from './DarkTransparentBackground.module.css';
import {useClasses} from "../../../hooks/useClasses";

function DarkTransparentBackground({className, children, ...props}) {

    const classes = useClasses(style.main, className)

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default DarkTransparentBackground;