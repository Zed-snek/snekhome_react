import style from "./Search.module.css";
import {useState} from "react";
import TransparentModal from "../../UI/modal/TransparentModal";
import SearchUI from "./SearchUI";
import MyMessage from "../../UI/message/MyMessage";
import MySyncLoader from "../../UI/loaders/MySyncLoader";
import {useSearch} from "./useSearch";
import SearchItemList from "./SearchItemList";

function SearchDiv() {

    const [value, setValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const [searchFirst, searchCommunities, searchUsers, usersData, communitiesData, error, isLoading]
        = useSearch(value)

    function firstSearch() {
        if (value) {
            setIsOpen(true)
            searchFirst()
        }
    }

    return (
        <div>
            <SearchUI
                value={value}
                setValue={setValue}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={firstSearch}
            />

            <TransparentModal
                visible={isOpen}
                setVisible={setIsOpen}
                centered={false}
                className={style.modal}
            >
                <h4>Search users or communities</h4>

                <SearchUI
                    value={value}
                    setValue={setValue}
                    onClick={() => setIsOpen(false)}
                />

                <MyMessage className={style.error}>{error}</MyMessage>

                <SearchItemList array={usersData} type="USER"/>
                <SearchItemList array={communitiesData} type="COMMUNITY"/>

                <MySyncLoader loading={isLoading}/>
            </TransparentModal>
        </div>
    );
}

export default SearchDiv;