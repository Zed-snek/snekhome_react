import style from "./Search.module.css"
import {getCommunityImage, getUserImage} from "../../../functions/linkFunctions";

function SearchItemList({array, type}) { //type = COMMUNITY, USER
    return (
        <>
        { array.map((element, index) =>
            <div className={style.item}>
                <div>
                    <img alt="" className={style.itemImg}
                        src={type === "USER" ? getUserImage(element.image) : getCommunityImage(element.image)}
                    />
                </div>
                <div>
                    <div>
                        {element.title}
                    </div>
                    <div>
                        @{element.idName}
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default SearchItemList;