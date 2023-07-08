import React from 'react';
import style from './SortButtons.module.css';
import MySortOutlineButton from "./MySortOutlineButton";

function SortOutlineButtons({buttons, activeBtn, setActiveBtn}) {

    return (
        <div className={style.buttons}>
            {buttons.map( (btn, index) =>
                <MySortOutlineButton
                    key={index}
                    isActive={activeBtn === index}
                    onClick={() => setActiveBtn(index)}
                >
                    {btn}
                </MySortOutlineButton>
            )}
        </div>
    );
}

export default SortOutlineButtons;