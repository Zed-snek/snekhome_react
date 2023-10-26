import style from './UserPage.module.css'

function InfoTag({title, text}) {

    return (
        <div className={style.tagDiv}>
            <div className={style.tagTitle}>
                {title}:
            </div>
            <div className={style.tagText}>
                {text}
            </div>
        </div>
    );
}

export default InfoTag;