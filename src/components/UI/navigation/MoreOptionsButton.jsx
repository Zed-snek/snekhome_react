import React from 'react';
import {useClasses} from "../../../hooks/useClasses";
import style from "./MoreOptionsButton.module.css";

function MoreOptionsButton({options, className}) {

    const classes = useClasses(style.main, className)

    return (
        <div className={style.mainDiv}>
            <div className={classes}>
                <span className={style.dots}>···</span>
                <div className={style.options}>
                    {
                        options.map((o, index) =>
                            <div
                                className={style.option}
                                onClick={o.onClick}
                                key={index}
                            >
                                {o.title}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default MoreOptionsButton;