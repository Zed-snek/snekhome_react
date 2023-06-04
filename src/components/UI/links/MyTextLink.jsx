import React from 'react';
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import style from "./MyTextLink.module.css"
import {useClasses} from "../../../hooks/useClasses";

function MyTextLink({children, className, ...props}) {

    const classes = useClasses(style.link, className)

    return (
        <Nav.Link as={Link} className={classes.join(' ')} {...props}>
            {children}
        </Nav.Link>
    );
}

export default MyTextLink;