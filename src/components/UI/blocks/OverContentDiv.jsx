import React from 'react';
import style from './OverContentDiv.module.css'
import {useClasses} from "../../../hooks/useClasses";

function OverContentDiv({children, className, title, isShow, setIsShow, ...props}) {

    const classes = useClasses(className, style.main)

    return (
        <>
            { isShow ?
                <div className={classes.join(' ')} {...props}>

                    <div className={style.header}>
                        <div className={style.title}>
                            {title}
                        </div>
                        <div className={style.cancel} onClick={() => setIsShow(false)}>
                            ✗
                        </div>
                    </div>

                    <div>
                        {children}
                    </div>

                </div>
                : <></>
            }
        </>
    );
}

export default OverContentDiv;