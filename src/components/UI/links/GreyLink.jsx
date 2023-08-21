import style from "./GreyLink.module.css";
import {useClasses} from "../../../hooks/useClasses";
import {Link} from "react-router-dom";

function GreyLink({className, children, to, ...props}) {
    const classes = useClasses(style.main, className)

    return (
        <Link to={to} className={classes}>
            {children}
        </Link>
    );
}

export default GreyLink;