import React from 'react';
import style from './UserPage.module.css'

function InfoTag({title, text, id, children, ...props}) {


    return (
        <div className={style.tagDiv}>
            <div className="flexDiv flex-wrap">
                <div className={style.tagTitle}>
                    {title}:
                </div>
                <div className={style.tagText}>
                    {text}
                </div>
            </div>
        </div>
    );
}

export default InfoTag;