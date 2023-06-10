import React from 'react';
import style from "./ListItemBlock.module.css";
import InfoDiv from "./InfoDiv";
import MyOutlineButton from "../buttons/MyOutlineButton";
import MyTextLink from "../links/MyTextLink";
import {Link} from "react-router-dom";

function ListItemBlock({children, image, title, link, idName, buttonContent, buttonClick, rightCornerContent, ...props}) {

    return (
        <div {...props}>
            <InfoDiv className={style.main}>
                <div>
                    <Link to={link}>
                        <img src={image} className={style.image} />
                    </Link>
                </div>
                <div className={style.centerDiv}>
                    <MyTextLink to={link} className={style.title}>
                        {title}
                    </MyTextLink>
                    <div className={style.idName}>
                        @{idName}
                    </div>
                </div>
                <div className={style.rightDiv}>
                    <div>
                        {rightCornerContent}
                    </div>
                    { buttonContent ?
                        <MyOutlineButton className={style.outlineBtn}>
                            {buttonContent}
                        </MyOutlineButton>
                        : <> </>
                    }
                </div>
            </InfoDiv>
        </div>
    );
}

export default ListItemBlock;