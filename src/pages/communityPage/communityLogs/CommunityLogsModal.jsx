import {Fragment, useState} from "react";
import style from "./CommunityLogsModal.module.css";
import TransparentModal from "../../../components/UI/modal/TransparentModal";
import {useFetching} from "../../../hooks/useFetching";
import {usePaginateLoad} from "../../../hooks/usePaginateLoad";
import LoaderAndErrorDiv from "../../../components/structureComponents/LoaderAndErrorDiv";
import CommunityService from "../../../API/CommunityService";
import {getLogContent} from "./CommunityLogContent";

function CommunityLogsModal({setIsOpen, groupname}) {

    const [data, setData] = useState([])

    const [fetchLogs, isFetchLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getLogs(groupname, pageNumber)
        if (responseData.length === 0)
            setCanLoad(false)
        setData(prev => [...prev, ...responseData])
    })

    const [pageNumber, logsTriggerElement, setCanLoad] = usePaginateLoad(fetchLogs, isFetchLoading)

    return (
        <TransparentModal
            visible
            setVisible={setIsOpen}
            className={style.modal}
            centered={false}
        >
            <h4>Community logs list: </h4>

            <div className={style.logList}>
                { data.map((element, index) =>
                    <Fragment key={index}>
                        {getLogContent(element)}
                    </Fragment>
                )}
            </div>

            <LoaderAndErrorDiv error={fetchError} isLoading={isFetchLoading} />

            {logsTriggerElement} {/*trigger to load next posts*/}
        </TransparentModal>
    );

}

export default CommunityLogsModal;