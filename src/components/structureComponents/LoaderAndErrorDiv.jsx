import style from "./LoaderAndErrorDiv.module.css";
import MyMessage from "../UI/message/MyMessage";
import MySyncLoader from "../UI/loaders/MySyncLoader";
import {useClasses} from "../../hooks/useClasses";

function LoaderAndErrorDiv({isLoading, error, messageClassName}) {

    const messageClass = useClasses(style.error, messageClassName)

    return (
        <div className={style.main}>
            <MyMessage className={messageClass}>{error}</MyMessage>
            <MySyncLoader loading={isLoading} />
        </div>
    );
}

export default LoaderAndErrorDiv;