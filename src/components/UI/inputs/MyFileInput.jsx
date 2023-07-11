import React from 'react';
import style from './MyFileInput.module.css'

function MyFileInput({className, children, maxSize, maxFiles, setIsShowError, setImage, accept, ...props}) {

    function handleChange(e) { //required: maxSize
        const file = e.target.files[0]
        if (file) {
            if (maxSize * 1000000 > file.size)
                setImage({
                    name: 'image',
                    value: file
                });
            else
                setIsShowError(true) //shows an error
        }
    }

    function handleChangeMany(e) { //required: maxFiles, maxSize
        const files = e.target.files
        let filesToSet = []
        let isError = false
        for (let i = 0; i < files.length; i++) {
            if (maxSize * 1000000 < files[i].size)
                isError = true
            else
                filesToSet.push(files[i])
        }
        setImage(prev => {
            let prevLen = prev.length
            if (prevLen + filesToSet.length > maxFiles) {
                let arr = []
                for (let i = 0; i < maxFiles - prevLen; i++) {
                    arr.push(filesToSet[i])
                }
                setIsShowError(true)
                return [...prev, ...arr]
            }
            if (isError)
                setIsShowError(true)
            return [...prev, ...filesToSet]
        })
    }


    return (
        <div className={className}>
            <label className={style.label}>
                {children}
                <input
                    {...props}
                    type="file"
                    accept={accept ? accept : "image/png, image/jpeg, image/gif"}
                    className={style.input}
                    multiple={maxFiles && maxFiles > 1}
                    onChange={maxFiles ? handleChangeMany : handleChange}
                    onClick={ event => {event.target.value = null} }
                />
            </label>
        </div>

    );
}

export default MyFileInput;