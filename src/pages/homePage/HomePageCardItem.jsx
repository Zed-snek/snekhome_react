import React from 'react';
import style from "./HomePage.module.css";
import OverImageDiv from "../../components/UI/blocks/OverImageDiv";
import {useClasses} from "../../hooks/useClasses";

function HomePageCardItem({title, image, isHover, className, ...props}) {

    const classes = useClasses(style.cardItem, className)

    return (
        <div className={classes.join(' ')} {...props}>
            <OverImageDiv className={style.cardItemOverImageDiv}>
                @{title}
            </OverImageDiv>
            <img src={image}/>
        </div>
    );
}

export default HomePageCardItem;