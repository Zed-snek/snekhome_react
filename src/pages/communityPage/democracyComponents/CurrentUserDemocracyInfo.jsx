import style from "./CurrentUserDemocracyInfo.module.css";
import parentStyle from "./CommunityDemocracyBlock.module.css";
import TextBlockWithInput from "../../../components/UI/inputs/TextBlockWithInput";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import MyPulseLoader from "../../../components/UI/loaders/MyPulseLoader";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import CheckMark from "../../../components/UI/symbols/CheckMark";
import XMark from "../../../components/UI/symbols/XMark";
import {useGlobalError} from "../../../hooks/useLoadingAndError";

function CurrentUserDemocracyInfo({data, groupname, className, setError}) {

    const citizenProgress = data?.citizenProgress

    const [activateCandidate, isCandidateActivationLoading, candidateActivationError] = useFetching(async () => {
        await CommunityService.becomeCandidate(groupname)
    })
    useGlobalError(candidateActivationError, setError)

    function isCheckMark(predicate) {
        if (predicate)
            return <CheckMark className={style.mark} />
        return <XMark className={style.mark} />
    }

    return (
        <div className={className}>
            <h6>
                Your candidate profile:
            </h6>

            <div className={style.centerFlex}>
                { data.citizenRight ?
                    <div>
                        <TextBlockWithInput
                            text={data.currentUserProgram + "safewrfw rwe trwe t34t 34t 34 t34y t34 t34 t3safewrfw rwe trwe t34t 34t 34 t34y t34 t34 t3safewrfw rwe trwe t34t 34t 34 t34y t34 t34 t3"}
                            textAreaProps={{rows: 3}}
                            contentClass={parentStyle.program}
                            isEdit={!data.electionsNow}
                            onAcceptCallback={text => console.log(text)} //todo onAcceptCallback
                        />

                        { data.currentUserActiveCandidate ?
                            <div>
                                { data.electionsNow
                                    ? "You are a participant of elections as a candidate"
                                    : "You are on the list of candidates for the next elections"
                                }
                            </div>
                            :
                            <div className={parentStyle.centerFlex}>
                                { data.electionsNow ?
                                    <div>
                                        You can't become a candidate until after elections
                                    </div>
                                    :
                                    <>
                                        <div>
                                            Click below to become an active candidate
                                        </div>

                                        <div>
                                            <MyTransparentButton
                                                className={style.candidateBtn}
                                                onClick={activateCandidate}
                                            >
                                                { isCandidateActivationLoading
                                                    ? <MyPulseLoader size={9} />
                                                    : <> Become a candidate </>
                                                }
                                            </MyTransparentButton>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    </div>
                    : <>
                        <div>
                            You don't have citizen rights, citizen progress:
                        </div>

                        <div>
                            <div>
                                <bold>•</bold> Days {citizenProgress.currentUserDays}/{citizenProgress.requiredDays}
                                {isCheckMark(citizenProgress.currentUserDays >= citizenProgress.requiredDays)}
                            </div>

                            <div>
                                <bold>•</bold> Rating {citizenProgress.currentUserRating}/{citizenProgress.requiredRating}
                                {isCheckMark(citizenProgress.currentUserRating >= citizenProgress.requiredRating)}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default CurrentUserDemocracyInfo;