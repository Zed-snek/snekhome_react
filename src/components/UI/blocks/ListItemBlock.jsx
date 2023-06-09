import React from 'react';
import style from "./ListItemBlock.module.css";
import InfoDiv from "./InfoDiv";
import MyOutlineButton from "../buttons/MyOutlineButton";

function ListItemBlock({children, image, title, link, idName, buttonContent, buttonClick, rightCornerContent, ...props}) {

    return (
        <div {...props}>
            <InfoDiv className={style.main}>
                <div>
                    <img src={image} className={style.image}/>
                </div>
                <div className={style.centerDiv}>
                </div>

                { buttonContent ?
                    <MyOutlineButton>
                        {buttonContent}
                    </MyOutlineButton>
                    : <> </>
                }
            </InfoDiv>
        </div>
    );
}

export default ListItemBlock;