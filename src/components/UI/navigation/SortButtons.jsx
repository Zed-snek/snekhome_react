import React from 'react';
import style from './SortButtons.module.css';
import MySortButton from "./MySortButton";

function SortButtons({buttons, activeBtn, setActiveBtn}) {

    return (
        <div className={style.buttons}>
            {buttons.map( (btn, index) =>
                <React.Fragment key={index}>
                    <MySortButton
                        isActive={activeBtn === index}
                        onClick={() => setActiveBtn(index)}
                    >
                        {btn}
                    </MySortButton>
                    { index === buttons.length - 1
                        ? ''
                        : <div className={style.dot}> · </div>
                    }
                </React.Fragment>
            )}
        </div>
    );
}

export default SortButtons;