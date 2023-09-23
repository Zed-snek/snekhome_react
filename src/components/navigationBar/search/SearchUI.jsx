import style from "./Search.module.css";
import MyGreyInput from "../../UI/inputs/MyGreyInput";
import SearchSvg from "../../UI/svg/SearchSvg";


function SearchUI({value, setValue, onClick}) {
    return (
        <div className={style.main}>
            <MyGreyInput
                className={style.searchInput}
                placeholder="search..."
                onChange={event => setValue(event.target.value)}
                value={value}
            />

            <button
                className={style.searchButton}
                onClick={onClick}
            >
                <SearchSvg color="#939393"/>
            </button>
        </div>
    );
}

export default SearchUI;