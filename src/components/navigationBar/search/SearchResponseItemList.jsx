import style from "./Search.module.css";
import {getCommunityImage, getUserImage} from "../../../utils/linkFunctions";
import DarkTransparentBackground from "../../UI/blocks/DarkTransparentBackground";
import BoxedTextLink from "../../UI/links/BoxedTextLink";
import {Link} from "react-router-dom";
import {useState} from "react";
import SearchResponseItemListObserver from "./SearchResponseItemListObserver";
import SearchService from "../../../API/SearchService";

function SearchResponseItemList({data, setData, searchValue, type, setError, setIsLoading}) { //type = COMMUNITY, USER

    const linkSuffix = type === "USER" ? "/u/" : "/c/"
    const [isShowMore, setIsShowMore] = useState(false)
    const [canLoad, setCanLoad] = useState(true)

    const isFound = data.length > 0

    async function searchFunction(pageNumber) {
        setIsLoading(true)

        let func
        if (type === "COMMUNITY")
            func = async () => SearchService.searchCommunities(searchValue, pageNumber)
        else /*if === "USER"*/
            func = async () => SearchService.searchUsers(searchValue, pageNumber)

        const responseData = await func()
            .finally(() => setIsLoading(false))

        if (responseData.length > 0) {
            if (data.length === 4)
                setData(responseData)
            else
                setData(prev => [...prev, ...responseData])
        }
        else {
            setCanLoad(false)
        }
    }

    return (
        <div className={style.listMain}>
            <div className={style.itemListTitle}>
                { type === "USER"
                    ? isFound ? "Found users:" : "Users not found"
                    : isFound ? "Found communities:" : "Communities not found"
                }
            </div>

            <div className={style.itemList}>
               { data.map((element, index) =>
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
                           <BoxedTextLink
                               to={linkSuffix + element.idName}
                               className={style.itemLink}
                           >
                               @{element.idName}
                           </BoxedTextLink>
                       </div>
                   </DarkTransparentBackground>
               )}
            </div>

            { isShowMore && canLoad ?
                <SearchResponseItemListObserver
                    searchFunction={searchFunction}
                    setError={setError}
                    setIsLoading={setIsLoading}
                />
            : <></> }

            { data.length >= 4 && !isShowMore ?
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