import style from './VoteFormCandidateList.module.css';
import parentStyle from './CommunityDemocracyBlock.module.css';
import VoteForm from "../../../components/UI/inputs/VoteForm";
import {useMemo} from "react";

function VoteFormCandidateList({isElectionsNow, isCitizenRight, candidateList}) {

    const voteOptions = useMemo(() => {
        console.log(candidateList)
        const options = isElectionsNow ? candidateList.currentCandidates : candidateList.previousCandidates
        if (options?.length > 0)
            return options.map((candidate, index) => {
                    return {
                        id: index,
                        title: "@" + candidate.nickname,
                        votes: candidate.votes
                    }
            })
            .sort((a, b) => b.votes - a.votes)
        else
            return null
    }, [candidateList.previousCndidates, candidateList.currentCandidates])

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
                        onVoteCallback={() => console.log("voted")} //todo finish
                    />
                    :
                    <VoteForm
                        votedId={candidateList.votedId}
                        options={voteOptions}
                        totalVotes={candidateList.totalVotes}
                        isResult={true}
                    />
                }
            </div>

            <div className={style.candidateList}>
                <h6>
                    { isElectionsNow
                        ? "List of candidates of current elections:"
                        : "List of candidates for next elections:"
                    }
                </h6>
            </div>
        </div>
    );
}

export default VoteFormCandidateList;