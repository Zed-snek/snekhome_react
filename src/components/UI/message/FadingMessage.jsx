import {useState} from 'react';
import style from './FadingMessage.module.css'
import {useClasses} from "../../../hooks/useClasses";
import {useInterval} from "usehooks-ts";

function FadingMessage({className, children, isShow, setIsShow, ...props}) {

    const classes = useClasses(className, style.main) //parent must have property position: relative; to work properly

    const [transparent, setTransparent] = useState(1)


    useInterval(() => {
        if (transparent > 0) {
            setTransparent(transparent - 0.02)
        }
        else {
            setIsShow(false)
            setTransparent(1)
        }

    }, isShow ? 50 : null)

    return (
        <>
            { isShow
                ? <div
                    className={classes}
                    style={{opacity: transparent}}
                    {...props}
                >
                    {children}
                </div>
                : <></>
            }
        </>
    );
}

export default FadingMessage;