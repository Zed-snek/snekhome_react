import React from 'react';
import style from './MyFileInput.module.css'
import {useClasses} from "../../../hooks/useClasses";
import myButtonStyle from "../buttons/MyTransparentButton.module.css"

function MyFileInput({className, children, maxSize, setIsShow, setImage, ...props}) {

    const classes = useClasses(myButtonStyle.main, className)


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
        <div>
            <label htmlFor="id" className={classes.join(' ')}>
                {children}
            </label>
            <input
                {...props}
                id="id"
                type="file"
                className={style.main}
                onChange={handleChange}
                onClick={ event => {event.target.value = null} }
            />
        </div>

    );
}

export default MyFileInput;