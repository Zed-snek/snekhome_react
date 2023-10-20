import style from "./CommunityTypeBlock.module.css";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";

function CommunityTypeBlock({image, title, color, isClosed, isAnonymous}) {

    function symbol(bool) {
        if (bool)
            return <span className={style.checkMark}>✓</span>
        else
            return <span className={style.xSymbol}>✗</span>
    }

    return (
        <OutlineFilledDiv className={style.communityTypeBlock}>
            <img
                className={style.communityTypeImage}
                src={image}
                alt="Type of community:"
            />
            <div
                className={style.communityTypeTitle}
                style={{color: color}}
            >
                {title}
            </div>
            <div className={style.communitySettings}>
                <div>
                    <div>
                        Closed:
                    </div>
                    <div>
                        Anonymous posts:
                    </div>
                </div>
                <div>
                    <div>
                        {symbol(isClosed)}
                    </div>
                    <div>
                        {symbol(isAnonymous)}
                    </div>
                </div>
            </div>
        </OutlineFilledDiv>
    );
}

export default CommunityTypeBlock;