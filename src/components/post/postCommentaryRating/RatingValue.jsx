import React from 'react';
import style from "./PostCommenataryRating.module.css";

function RatingValue({value}) {
    if (value > 0)
        return <div className={style.ratingValuePositive}> +{value} </div>
    else if (value < 0)
        return <div className={style.ratingValueNegative}> {value} </div>
    else
        return <div className={style.ratingValueNeutral}> {value} </div>
}

export default RatingValue;