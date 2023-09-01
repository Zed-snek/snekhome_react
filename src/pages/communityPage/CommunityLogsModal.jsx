import style from "./CommunityLogsModal.module.css";
import TransparentModal from "../../components/UI/modal/TransparentModal";
import {useFetching} from "../../hooks/useFetching";
import {usePaginateLoad} from "../../hooks/usePaginateLoad";

function CommunityLogsModal({isOpen, setIsOpen}) {

    const [fetchLogs, isFetchLoading, fetchError] = useFetching(async () => {

    })

    const [pageNumber, lastElementRef, setCanLoad] = usePaginateLoad(fetchLogs(), isFetchLoading)

    return (
        <TransparentModal
            visible={isOpen}
            setVisible={setIsOpen}
            className={style.modal}
        >
            <h4>Community logs list: </h4>
            <div ref={lastElementRef} style={{height: 20}}> </div> {/*trigger to load next posts*/}
        </TransparentModal>
    );

}

export default CommunityLogsModal;