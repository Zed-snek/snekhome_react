import React from 'react';
import {Link} from "react-router-dom";
import style from "./MyTextLink.module.css"
import {useClasses} from "../../../hooks/useClasses";

function MyTextLink({children, className, ...props}) {

    const classes = useClasses(style.link, className)

    return (
        <Link className={classes.join(' ')} {...props}>
            {children}
        </Link>
    );
}

export default MyTextLink;