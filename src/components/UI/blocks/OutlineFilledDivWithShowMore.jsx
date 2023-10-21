import style from "./OutlineFilledDiv.module.css";
import {useState} from "react";
import OutlineFilledDiv from "./OutlineFilledDiv";
import MyTransparentButton from "../buttons/MyTransparentButton";
import {useClasses} from "../../../hooks/useClasses";
import MyPulseLoader from "../loaders/MyPulseLoader";

function OutlineFilledDivWithShowMore({className, children, showMoreContent, onClickMoreContent, isLoading, ...props}) {

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
                        onClick={() => {
                            setIsMoreContent(prev => !prev)
                            if (onClickMoreContent)
                                onClickMoreContent()
                        }}
                    >
                        { isLoading
                            ? <MyPulseLoader size={6} color="#2D5DB2" />
                            : isMoreContent
                                ? "Show less..."
                                : "Show more..."
                        }
                    </MyTransparentButton>
                : <></> }
            </div>
        </OutlineFilledDiv>
    );
}

export default OutlineFilledDivWithShowMore;