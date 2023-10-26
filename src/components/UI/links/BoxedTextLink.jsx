import React from 'react';
import style from "./BoxedTextLink.module.css";
import {Link} from "react-router-dom";
import {useClasses} from "../../../hooks/useClasses";

function BoxedTextLink({to, className, children}) {

    const classes = useClasses(style.main, className)

    return (
        <Link
            to={to}
            className={classes}
        >
            {children}
        </Link>
    );
}

export default BoxedTextLink;