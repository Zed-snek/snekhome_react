import {useFetching} from "../../../hooks/useFetching";
import {usePaginateLoad} from "../../../hooks/usePaginateLoad";
import {useLoadingAndError} from "../../../hooks/useLoadingAndError";

function SearchResponseItemListObserver({searchFunction, setError, setIsLoading}) {

    const [fetchSearch, isSearchLoading, searchError] = useFetching(async () => {
        searchFunction(pageNumber)
    })
    const [pageNumber, triggerElement, setCanUserLoad] = usePaginateLoad(fetchSearch, isSearchLoading)

    useLoadingAndError(isSearchLoading, setIsLoading, searchError, setError)

    return (
        <div> {/*trigger element to load more data*/}
            {triggerElement}
        </div>
    );
}

export default SearchResponseItemListObserver;