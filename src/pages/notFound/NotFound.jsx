import React from 'react';
import style from './NotFound.module.css';
import neon from '../../styles/neon.module.css';
import {useDocumentTitle} from "usehooks-ts";

function NotFound() {

    useDocumentTitle("404 Not Found")

    return (
        <div className={style.sign}>

            <p className={neon.blue + ' ' + style.numbers}> 404 </p>
            <p className={neon.blue}> Page Not Found </p>
        </div>
    );
}

export default NotFound;