import React from 'react';
import style from './ChooseCommunity.module.css';
import {useClasses} from "../../../hooks/useClasses";

function ChooseCommunityItem({color, title, children, image, id, chosen, setChosen, className}) {

    const classes = useClasses(style.item, className)
    classes.push(color)
    if (id === chosen)
        classes.push(style.chosen)

    return (

        <div
            className={classes.join(' ')}
            onClick={() => setChosen(id)}
        >
            <div className={style.title}>
                {title}
            </div>

            <div className={style.imageDiv}>
                <img src={image} className={style.image} alt={id}/>
            </div>

            <div className={style.description}>
                {children}
            </div>
        </div>

    );
}

export default ChooseCommunityItem;