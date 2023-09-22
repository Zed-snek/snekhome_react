import style from "./Search.module.css";
import MyGreyInput from "../UI/inputs/MyGreyInput";
import SearchSvg from "../UI/svg/SearchSvg";
import {useState} from "react";

function Search() {

    const [value, setValue] = useState("")

    return (
        <div className={style.main}>
            <MyGreyInput
                className={style.searchInput}
                placeholder="search..."
                onChange={event => setValue(event.target.value)}
            />

            <button className={style.searchButton}>
                <SearchSvg color="#939393"/>
            </button>
        </div>
    );
}

export default Search;