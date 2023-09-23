import style from "./Search.module.css";
import {useState} from "react";
import SearchInputUI from "./SearchInputUI";
import SearchModal from "./SearchModal";

function SearchDiv() {

    const [value, setValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    function firstSearch() {
        if (value) {
            setIsOpen(true)
            searchFirst()
        }
    }

    return (
        <div>
            <SearchInputUI
                value={value}
                setValue={setValue}
                onClick={firstSearch}
            />

            <SearchModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                value={value}
                setValue={setValue}
            />
        </div>
    );
}

export default SearchDiv;