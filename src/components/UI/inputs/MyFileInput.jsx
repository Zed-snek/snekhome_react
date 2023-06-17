import React from 'react';
import style from './MyFileInput.module.css'

function MyFileInput({className, children, maxSize, setIsShow, setImage, ...props}) {


    function handleChange(e) {
        let file = e.target.files[0]
        if (file) {
            if (maxSize * 1000000 > file.size)
                setImage({
                    name: 'image',
                    value: file
                });
            else
                setIsShow(true)
        }
    }



    return (
        <div className={className}>
            <label className={style.label}>
                {children}
                <input
                    {...props}
                    type="file"
                    className={style.input}
                    onChange={handleChange}
                    onClick={ event => {event.target.value = null} }
                />
            </label>
        </div>

    );
}

export default MyFileInput;