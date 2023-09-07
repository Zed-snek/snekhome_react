import style from "./LoaderAndErrorDiv.module.css";
import MyMessage from "../UI/message/MyMessage";
import MySyncLoader from "../UI/loaders/MySyncLoader";

function LoaderAndErrorDiv({isLoading, error}) {
    return (
        <div className={style.main}>
            <MyMessage className={style.error}>{error}</MyMessage>
            <MySyncLoader loading={isLoading} />
        </div>
    );
}

export default LoaderAndErrorDiv;