import React from 'react';
import style from "./MyCheckbox.module.css"

function MyCheckbox({label}) {

    return (
        <div className={style.mainDiv}>
            <input
                className={style.main}
                id="check"
                type="checkbox"
            />
            <label className={style.label} htmlFor="check">
                {label}
            </label>
        </div>

    );
}

export default MyCheckbox;