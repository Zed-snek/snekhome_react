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
import {getErrorResponseMessage} from "../../../functions/objectFunctions";

function CurrentUserDemocracyInfo({data, setData, citizenRating, citizenDays, isMember, groupname, setError, ...props}) {

    const [activateCandidate, isCandidateActivationLoading, candidateActivationError] = useFetching(async () => {
        await CommunityService.becomeCandidate(groupname)
    })
    useGlobalError(candidateActivationError, setError)

    function isCheckMark(predicate) {
        if (predicate)
            return <CheckMark className={style.mark} />
        return <XMark className={style.mark} />
    }

    async function updateProgram(text) {
        if (text.length < 5) {
            setError("Program must be at least 5 symbols")
            return false
        }
        else {
            setError("")
            let func
            if (data.currentUserProgram)
                func = () => CommunityService.updateCandidateProgram(groupname, text)
            else
                func = () => CommunityService.createCandidateProgram(groupname, text)

            let boolean
            await func()
                .then(() => {
                    setData(prev => ({...prev,
                        currentUserProgram: text,
                        currentUserActiveCandidate: true
                    }))
                    boolean = true
                })
                .catch(exception => {
                    setError(getErrorResponseMessage(exception))
                    boolean = false
                })
            return boolean
        }
    }

    return (
        <div {...props}>
            <h6>
                Your candidate profile:
            </h6>

            <div className={style.centerFlex}>
                { data.citizenRight ?
                    <div>
                        <TextBlockWithInput
                            text={data.currentUserProgram}
                            ifNullText="write your program before become a candidate"
                            textAreaProps={{
                                rows: 3,
                                placeholder: "write your program before become a candidate...",
                                maxLength: 1024
                            }}
                            contentClass={parentStyle.program}
                            isEdit={!data.electionsNow}
                            onAcceptCallback={program => updateProgram(program)}
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
                                        You can't become a candidate until current elections will end
                                    </div>
                                    :
                                    data.currentUserProgram ?
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
                                        : <div>
                                            To become a candidate, firstly write the candidate program
                                        </div>
                                }
                            </div>
                        }
                    </div>
                    : isMember
                        ? <>
                            <div>
                                You don't have citizen rights, citizen progress:
                            </div>

                            <div>
                                <div>
                                    <bold>•</bold> Days {data.currentUserDays}/{citizenDays}
                                    {isCheckMark(data.currentUserDays >= citizenDays)}
                                </div>

                                <div>
                                    <bold>•</bold> Rating {data.currentUserRating}/{citizenRating}
                                    {isCheckMark(data.currentUserRating >= citizenRating)}
                                </div>
                            </div>
                        </>
                        : <div>
                            You can't participate in democracy life if you are not a member of the community
                        </div>
                }
            </div>
        </div>
    );
}

export default CurrentUserDemocracyInfo;