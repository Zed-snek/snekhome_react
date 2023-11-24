import style from './VoteFormCandidateList.module.css';
import parentStyle from './CommunityDemocracyBlock.module.css';
import VoteForm from "../../../components/UI/inputs/VoteForm";
import {useMemo} from "react";
import CandidateItem from "./CandidateItem";
import CommunityService from "../../../API/CommunityService";
import {getErrorResponseMessage} from "../../../utils/objectFunctions";
import MyMessage from "../../../components/UI/message/MyMessage";

function VoteFormCandidateList({
       groupname, setError, isElectionsNow, isCitizenRight, isFirstElections, candidateList, setCandidateList
}) {

    const voteOptions = useMemo(() => {
        let options = isElectionsNow ? candidateList.currentCandidates : candidateList.previousCandidates
        if (options?.length > 0) {
            options = options.map(({id, nickname, votes}, index) => {
                return {
                    index: index,
                    id: id,
                    title: "@" + nickname,
                    votes: votes
                }
            })
            if (!isElectionsNow)
                options = options.sort((a, b) => b.votes - a.votes)

            return options
        }
        else {
            return null
        }
    }, [])

    async function vote(index) {
        setError("")
        const obj = candidateList.currentCandidates[index]
        await CommunityService.makeVote(groupname, obj.nickname)
            .then(() => setCandidateList(prev => ({...prev, votedId: obj.id})))
            .catch(err => setError(() => getErrorResponseMessage(err)))
    }


    return (
        <div className={parentStyle.showMoreInfo}>
            <div className={style.voteForm}>
                <h6>
                    { isElectionsNow
                        ? "Vote for next president:"
                        : "Results of last elections:"
                    }
                </h6>

                { isElectionsNow ?
                    <VoteForm
                        votedId={candidateList.votedId}
                        options={voteOptions}
                        isAllowToVote={isCitizenRight}
                        onVoteCallback={vote}
                    />
                    : isFirstElections
                        ? <MyMessage className={style.message}>
                            It hasn't been any elections in this community yet
                        </MyMessage>
                        : <VoteForm
                            votedId={candidateList.votedId}
                            options={voteOptions}
                            totalVotes={candidateList.totalVotes}
                            isResult={true}
                        />
                }
            </div>

            <div className={style.candidateListDiv}>
                <h6>
                    { isElectionsNow
                        ? "List of candidates of current elections:"
                        : "List of candidates for next elections:"
                    }
                </h6>

                <div className={style.candidateList}>
                    { candidateList.currentCandidates.map(({name, surname, nickname, image, program}, index) =>
                        <CandidateItem
                            key={index}
                            nickname={nickname}
                            title={name + " " + surname}
                            image={image}
                            program={program}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VoteFormCandidateList;