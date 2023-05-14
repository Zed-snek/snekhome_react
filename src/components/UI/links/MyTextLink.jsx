import React from 'react';
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import style from "./MyTextLink.module.css"

function MyTextLink({children, ...props}) {

    return (
        <Nav.Link as={Link} className={style.link} {...props}>
            {children}
        </Nav.Link>
    );
}

export default MyTextLink;