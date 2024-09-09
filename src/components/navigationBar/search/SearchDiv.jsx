import style from "./Search.module.css";
import {useState} from "react";
import SearchInputUI from "./SearchInputUI";
import MyMessage from "../../UI/message/MyMessage";
import SearchResponseItemList from "./SearchResponseItemList";
import MySyncLoader from "../../UI/loaders/MySyncLoader";
import TransparentModal from "../../UI/modal/TransparentModal";
import {useFetching} from "../../../hooks/useFetching";
import SearchService from "../../../API/SearchService";
import {useLoadingAndError} from "../../../hooks/useLoadingAndError";

function SearchDiv() {

    const [value, setValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [usersData, setUsersData] = useState([])
    const [communitiesData, setCommunitiesData] = useState([])

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [searchFirst, isFirstLoading, firstSearchError] = useFetching(async () => {
        if (value) {
            const responseData = await SearchService.firstSearch(value)
            setUsersData(responseData.users)
            setCommunitiesData(responseData.communities)
        }
    })

    function firstSearch() {
        if (value) {
            setIsOpen(true)
            searchFirst()
        }
    }

    useLoadingAndError(isFirstLoading, setIsLoading, firstSearchError, setError)

    return (
        <div>
            <SearchInputUI
                value={value}
                setValue={setValue}
                onClick={firstSearch}
            />

            <TransparentModal
                visible={isOpen}
                setVisible={setIsOpen}
                centered={false}
                className={style.modal}
            >
                <h4>Search users or communities</h4>

                <SearchInputUI
                    value={value}
                    setValue={setValue}
                    onClick={() => searchFirst()}
                />

                <MyMessage className={style.error}>{error}</MyMessage>

                <SearchResponseItemList
                    data={communitiesData}
                    setData={setCommunitiesData}
                    searchValue={value}
                    type="COMMUNITY"
                    setError={setError}
                    setIsLoading={setIsLoading}
                />

                <SearchResponseItemList
                    data={usersData}
                    setData={setUsersData}
                    searchValue={value}
                    type="USER"
                    setError={setError}
                    setIsLoading={setIsLoading}
                />

                <MySyncLoader loading={isLoading}/>
            </TransparentModal>
        </div>
    );
}

export default SearchDiv;