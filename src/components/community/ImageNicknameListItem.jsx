import React from 'react';
import style from "./ImageNicknameListItem.module.css";
import MyBoxedTextLink from "../UI/links/MyBoxedTextLink";

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
                    <MyBoxedTextLink to={"/u/" + nickname} className={style.link}>
                        @{nickname}
                    </MyBoxedTextLink>
                </div>
            </div>

            {rightContent}

        </div>
    );
}

export default ImageNicknameListItem;