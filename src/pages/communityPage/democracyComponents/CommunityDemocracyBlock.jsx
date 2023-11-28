import style from './CommunityDemocracyBlock.module.css';
import OutlineFilledDivWithShowMore from "../../../components/UI/blocks/OutlineFilledDivWithShowMore";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";
import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import TextBlockWithInput from "../../../components/UI/inputs/TextBlockWithInput";
import CurrentUserDemocracyInfo from "./CurrentUserDemocracyInfo";
import MessageModal from "../../../components/UI/modal/MessageModal";
import {formatDateWithMonthName} from "../../../utils/timeDateFunctions";
import {useSetStateOnReact} from "../../../hooks/useLoadingAndError";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import VoteFormCandidateList from "./VoteFormCandidateList";

function CommunityDemocracyBlock({citizenRating, citizenDays, setPresidencyStats, isMember, groupname}) {


    //Democracy data fetching
    const [democracyData, setDemocracyData] = useState()
    const [fetchData, isFetchingLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getDemocracyData(groupname)
        setDemocracyData(responseData)
        setPresidencyStats({
            bannedUsers: responseData.bannedUsersStats,
            bannedCitizens: responseData.bannedCitizensStats,
            deletedPosts: responseData.deletedPostsStats
        })
    })

    useEffect(() => {
        fetchData()
    }, [])


    //Candidate list fetching
    const [candidateListData, setCandidateListData] = useState()
    const [fetchCandidateList, isCandidateListLoading, candidateListError] = useFetching(async () => {
        const responseData = await CommunityService.getCandidateList(groupname)
        setCandidateListData(responseData)
    })

    function loadCandidateList() {
        if (!candidateListData)
            fetchCandidateList()
    }

    //Errors handling
    const [error, setError] = useState("")
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

    useEffect(() => {
        if (error)
            setIsErrorModalOpen(true)
    }, [error])
    useSetStateOnReact(fetchError, setError)
    useSetStateOnReact(candidateListError, setError)


    function showMoreContent() {
        if (candidateListData)
            return (
                <div>
                    <br/>
                    <BorderBottomDiv />
                    <br/>
                    <VoteFormCandidateList
                        isElectionsNow={democracyData.electionsNow}
                        isCitizenRight={democracyData.citizenRight}
                        isFirstElections={democracyData.electionsNumber === 1}
                        candidateList={candidateListData}
                        setCandidateList={setCandidateListData}
                        groupname={groupname}
                        setError={setError}
                    />
                </div>

            );
        else
            return <></>
    }

    if (democracyData)
        return (
            <div>
                <OutlineFilledDivWithShowMore
                    showMoreContent={showMoreContent()}
                    onClickMoreContent={loadCandidateList}
                    isLoading={isCandidateListLoading}
                >
                    <div className={style.generalInfo}>
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

                        <div className={style.currentPresidentProgram}>
                            <h6>
                                Current president program:
                            </h6>

                            <TextBlockWithInput
                                contentClass={style.program}
                                text={democracyData.currentPresidentProgram}
                            />
                        </div>

                        <div className={style.statsInfo}>
                            <h6>
                                Elections status:
                            </h6>

                            <div className={style.centerFlex}>
                                <div>
                                    { democracyData.electionsNow
                                        ? "The elections will end in "
                                        : "Next elections will start in "
                                    }
                                </div>

                                <div className={style.electionsDate}>
                                    {formatDateWithMonthName(democracyData.electionsDate)}
                                </div>
                            </div>
                        </div>
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