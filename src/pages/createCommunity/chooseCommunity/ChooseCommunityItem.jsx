import React from 'react';
import style from './ChooseCommunity.module.css';
import {useClasses} from "../../../hooks/useClasses";

function ChooseCommunityItem({color, title, children, image, id, chosen, setChosen, className}) {

    let classes = useClasses(style.item, className) + ' ' + color
    if (id === chosen)
        classes += ' ' + style.chosen

    return (

        <div
            className={classes}
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