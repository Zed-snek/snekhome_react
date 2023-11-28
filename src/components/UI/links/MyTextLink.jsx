import {Link} from "react-router-dom";
import style from "./MyTextLink.module.css"
import {useClasses} from "../../../hooks/useClasses";

function MyTextLink({children, className, isLink, ...props}) {

    const classes = useClasses(style.link, className)

    if (isLink === false)
        return (
            <div className={classes} {...props}>
                {children}
            </div>
        );
    else
        return (
            <Link className={classes} {...props}>
                {children}
            </Link>
        );
}

export default MyTextLink;