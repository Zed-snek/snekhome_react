import React from 'react';
import style from "./Colors.module.css";

function ColorElement({chosen, setChosen, id, active, color, ...props}) {


    const classes = [style.colorElement, color]
    if (chosen === id)
        classes.push(active)


    return (
        <div className={style.mainColorElementDiv} {...props}>
            <div
                className={classes.join(' ')}
                onClick={() => setChosen(id)}
            >
            </div>
        </div>
    );
}

export default ColorElement;