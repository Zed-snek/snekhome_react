import style from "./OutlineFilledDiv.module.css";
import {useState} from "react";
import OutlineFilledDiv from "./OutlineFilledDiv";
import MyTransparentButton from "../buttons/MyTransparentButton";
import {useClasses} from "../../../hooks/useClasses";

function OutlineFilledDivWithShowMore({className, children, showMoreContent, ...props}) {

    const [isMoreContent, setIsMoreContent] = useState(false)

    const classes = useClasses(style.divWithShowMore, className)

    return (
        <OutlineFilledDiv className={classes} {...props}>
            <div className={style.contentDivWithShowMore}>
                {children}

                { isMoreContent ?
                    <div>
                        {showMoreContent}
                    </div>
                : <></> }
            </div>

            <div>
                { showMoreContent ?
                    <MyTransparentButton
                        className={style.showMoreBtn}
                        onClick={() => setIsMoreContent(prev => !prev)}
                    >
                        { isMoreContent ? "Show less..." : "Show more..." }
                    </MyTransparentButton>
                : <></> }
            </div>
        </OutlineFilledDiv>
    );
}

export default OutlineFilledDivWithShowMore;