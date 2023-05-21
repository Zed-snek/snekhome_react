import React from 'react';
import style from "./MyCheckbox.module.css"

function MyCheckbox({label}) {

    return (
        <label className={style.label}>
            <div className={style.mainDiv}>
                <input
                    className={style.main}
                    type="checkbox"
                />
                <div>
                    {label}
                </div>
            </div>
        </label>
    );
}

export default MyCheckbox;