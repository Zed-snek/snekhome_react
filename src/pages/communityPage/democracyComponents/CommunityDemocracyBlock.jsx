import style from './CommunityDemocracyBlock.module.css';
import OutlineFilledDivWithShowMore from "../../../components/UI/blocks/OutlineFilledDivWithShowMore";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";
import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import TextBlockWithInput from "../../../components/UI/inputs/TextBlockWithInput";
import CurrentUserDemocracyInfo from "./CurrentUserDemocracyInfo";
import MessageModal from "../../../components/UI/modal/MessageModal";
import {formatDateWithMonthName} from "../../../functions/timeDateFunctions";

function CommunityDemocracyBlock({citizenRating, citizenDays, setPresidencyStats, isMember, groupname}) {

    const [democracyData, setDemocracyData] = useState()

    const [fetchData, isFetchingLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getDemocracyData(groupname)
        setDemocracyData(responseData)
        setPresidencyStats({
            bannedUsers: responseData.bannedUsersStats,
            bannedCitizens: responseData.bannedCitizensStats,
            deletedPosts: responseData.deletedPostsStats
        })
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

    if (democracyData)
        return (
            <div>
                <OutlineFilledDivWithShowMore
                    showMoreContent={showMoreContent()}
                >
                    <div className={style.generalInfo}>

                        <div className={style.statsInfo}>
                            <h6>
                                Elections status:
                            </h6>

                            <div>
                                <div>
                                    { democracyData.electionsNow
                                        ? "Elections will end in "
                                        : "Elections will start in "
                                    }
                                </div>
                                <div>
                                    {formatDateWithMonthName(democracyData.electionsDate)}
                                </div>
                            </div>
                        </div>

                        <div className={style.currentPresidentProgram}>
                            <h6>
                                Current president program:
                            </h6>

                            <TextBlockWithInput
                                contentClass={style.program}
                                text={democracyData.currentPresidentProgram}
                            />
                        </div>

                        <CurrentUserDemocracyInfo
                            className={style.candidateProfile}
                            groupname={groupname}
                            data={democracyData}
                            setData={setDemocracyData}
                            citizenRating={citizenRating}
                            citizenDays={citizenDays}
                            isMember={isMember}
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