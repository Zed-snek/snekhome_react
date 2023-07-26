import React from 'react';
import style from "./MyBoxedTextLink.module.css";
import {Link} from "react-router-dom";
import {useClasses} from "../../../hooks/useClasses";

function MyBoxedTextLink({to, className, children}) {

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

export default MyBoxedTextLink;