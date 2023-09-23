import style from "./Search.module.css";
import {getCommunityImage, getUserImage} from "../../../functions/linkFunctions";
import DarkTransparentBackground from "../../UI/blocks/DarkTransparentBackground";
import MyBoxedTextLink from "../../UI/links/MyBoxedTextLink";
import {Link} from "react-router-dom";
import {useState} from "react";
import BooleanBlock from "../../structureComponents/BooleanBlock";

function SearchResponseItemList({array, type, trigger}) { //type = COMMUNITY, USER

    const linkSuffix = type === "USER" ? "/u/" : "/c/"
    const [isShowMore, setIsShowMore] = useState(false)

    return (
        <div className={style.listMain}>
            <div className={style.itemListTitle}>
                {type === "USER" ? "Found users:" : "Found communities:"}
            </div>

            <div className={style.itemList}>
               { array.map((element, index) =>
                   <DarkTransparentBackground className={style.item} key={index}>
                       <Link to={linkSuffix + element.idName}>
                           <img alt="" className="userImage"
                                src={type === "USER" ? getUserImage(element.image) : getCommunityImage(element.image)}
                           />
                       </Link>
                       <div>
                           <div className={style.itemTitle}>
                               {element.title}
                           </div>
                           <MyBoxedTextLink
                               to={linkSuffix + element.idName}
                               className={style.itemLink}
                           >
                               @{element.idName}
                           </MyBoxedTextLink>
                       </div>
                   </DarkTransparentBackground>
               )}
            </div>

            <BooleanBlock bool={isShowMore}> {/*trigger element to load more data*/}
                {trigger}
            </BooleanBlock>

            { array.length >= 4 && !isShowMore ?
                <div className={style.showMoreBtnDiv}>
                    <div className={style.showMoreBtn} onClick={() => setIsShowMore(true)}>
                        Show more...
                    </div>
                </div>
            : <></> }
        </div>
    );
}

export default SearchResponseItemList;