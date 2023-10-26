import style from "./ImageNicknameListItem.module.css";
import BoxedTextLink from "../UI/links/BoxedTextLink";

function ImageNicknameListItem({image, nickname, rightContent}) {
    return (
        <div className={style.main}>
            <div className={style.leftDiv}>
                <img
                    alt=""
                    className="userImage"
                    src={image}
                />
                <div>
                    <BoxedTextLink to={"/u/" + nickname} className={style.link}>
                        @{nickname}
                    </BoxedTextLink>
                </div>
            </div>

            {rightContent}
        </div>
    );
}

export default ImageNicknameListItem;