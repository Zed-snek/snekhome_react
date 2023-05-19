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
            {children}
        </div>

    );
}

export default ChooseCommunityItem;