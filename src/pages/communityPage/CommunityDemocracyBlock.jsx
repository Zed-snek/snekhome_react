import style from './CommunityDemocracyBlock.module.css';
import OutlineFilledDivWithShowMore from "../../components/UI/blocks/OutlineFilledDivWithShowMore";
import MyPulseLoader from "../../components/UI/loaders/MyPulseLoader";
import {useEffect} from "react";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import TextBlockWithInput from "../../components/UI/inputs/TextBlockWithInput";
import MyTransparentButton from "../../components/UI/buttons/MyTransparentButton";
import XMark from "../../components/UI/symbols/XMark";
import CheckMark from "../../components/UI/symbols/CheckMark";

function CommunityDemocracyBlock({data, setData, groupname}) {

    const [fetchData, isFetchingLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getDemocracyData(groupname)
        setData(responseData)
        console.log("democracy data: ", responseData)
    })

    const citizenProg = data?.citizenProgress

    useEffect(() => {
        fetchData()
    }, [])

    function isCheckMark(predicate) {
        if (predicate)
            return <CheckMark className={style.mark} />
        return <XMark className={style.mark} />
    }

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

                        <div className={style.candidateProfile}>
                            <h6>
                                Your candidate profile:
                            </h6>

                            <div className={style.centerFlex}>
                                { data.citizenRight ?
                                    <div>
                                        <TextBlockWithInput
                                            text={data.currentUserProgram + "safewrfw rwe trwe t34t 34t 34 t34y t34 t34 t3safewrfw rwe trwe t34t 34t 34 t34y t34 t34 t3safewrfw rwe trwe t34t 34t 34 t34y t34 t34 t3"}
                                            textAreaProps={{rows: 3}}
                                            contentClass={style.program}
                                            isEdit={true}
                                            onAcceptCallback={text => console.log(text)} //todo onAcceptCallback
                                        />

                                        { data.currentUserActiveCandidate ?
                                            <div>
                                                You are on the list of candidates for the next elections
                                            </div>
                                            : <div className={style.centerFlex}>
                                                <div>
                                                    Click below to become an active candidate
                                                </div>
                                                <div>
                                                    <MyTransparentButton className={style.candidateBtn}>
                                                        Become a candidate
                                                    </MyTransparentButton>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    : <>
                                        <div>
                                            You don't have citizen rights, citizen progress:
                                        </div>

                                        <div>
                                            <div>
                                                <bold>•</bold> Days {citizenProg.currentUserDays}/{citizenProg.requiredDays}

                                                {isCheckMark(citizenProg.currentUserDays >= citizenProg.requiredDays)}
                                            </div>
                                            <div>
                                                <bold>•</bold> Rating {citizenProg.currentUserRating}/{citizenProg.requiredRating}

                                                {isCheckMark(citizenProg.currentUserRating >= citizenProg.requiredRating)}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </OutlineFilledDivWithShowMore>
            </div>
        );
    else
        return (
            <MyPulseLoader />
        );
}

export default CommunityDemocracyBlock;