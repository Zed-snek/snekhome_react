import style from './CommunityDemocracyBlock.module.css';
import OutlineFilledDivWithShowMore from "../../../components/UI/blocks/OutlineFilledDivWithShowMore";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";
import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import TextBlockWithInput from "../../../components/UI/inputs/TextBlockWithInput";
import CurrentUserDemocracyInfo from "./CurrentUserDemocracyInfo";
import MessageModal from "../../../components/UI/modal/MessageModal";

function CommunityDemocracyBlock({data, setData, groupname}) {

    const [fetchData, isFetchingLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getDemocracyData(groupname)
        setData(responseData)
        console.log("democracy data: ", responseData)
    })

    useEffect(() => {
        fetchData()
    }, [])

    const [error, setError] = useState("")
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    useEffect(() => {
        if (error)
            setIsErrorModalOpen(true)
    }, [error])

    function showMoreContent() {
        return (
            <div className={style.showMoreInfo}>
                showMoreInfo
            </div>
        );
    }

    if (data)
        return (
            <div>
                <OutlineFilledDivWithShowMore
                    showMoreContent={showMoreContent()}
                >
                    <div className={style.generalInfo}>

                        <div className={style.statsInfo}>
                            <h6>
                                Stats:
                            </h6>
                        </div>

                        <div className={style.currentPresidentProgram}>
                            <h6>
                                Current president program:
                            </h6>

                            <TextBlockWithInput
                                contentClass={style.program}
                                text={data.currentPresidentProgram}
                            />
                        </div>

                        <CurrentUserDemocracyInfo
                            groupname={groupname}
                            className={style.candidateProfile}
                            data={data}
                            setError={setError}
                        />
                    </div>
                </OutlineFilledDivWithShowMore>

                <MessageModal
                    visible={isErrorModalOpen}
                    setVisible={setIsErrorModalOpen}
                >
                    {error}
                </MessageModal>
            </div>
        );
    else
        return (
            <MyPulseLoader />
        );
}

export default CommunityDemocracyBlock;