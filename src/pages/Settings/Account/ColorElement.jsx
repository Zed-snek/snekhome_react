import React from 'react';
import style from "./Colors.module.css";

function ColorElement(props) {


    const classes = [style.colorElement, props.color]
    if (props.chosen === props.id) {
        classes.push(props.active)
    }

    return (
        <div className={style.mainColorElementDiv}>
            <div
                className={classes.join(' ')}
                onClick={() => props.setChosen(props.id)}
            >
            </div>
        </div>
    );
}

export default ColorElement;