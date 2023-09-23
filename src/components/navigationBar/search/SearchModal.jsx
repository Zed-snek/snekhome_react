import style from "./Search.module.css";
import SearchInputUI from "./SearchInputUI";
import MyMessage from "../../UI/message/MyMessage";
import SearchResponseItemList from "./SearchResponseItemList";
import MySyncLoader from "../../UI/loaders/MySyncLoader";
import TransparentModal from "../../UI/modal/TransparentModal";
import {useState} from "react";
import {useSearch} from "./useSearch";


function SearchModal({isOpen, setIsOpen, value, setValue}) {

    const [searchFirst, usersData, communitiesData,
        communityTriggerElement, userTriggerElement, error, isLoading]
        = useSearch(value)

    return (
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
                array={communitiesData}
                type="COMMUNITY"
                trigger={communityTriggerElement}
            />
            <SearchResponseItemList
                array={usersData}
                type="USER"
                trigger={userTriggerElement}
            />

            <MySyncLoader loading={isLoading}/>
        </TransparentModal>
    );
}

export default SearchModal;