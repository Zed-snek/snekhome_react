import style from './VoteFormCandidateList.module.css';
import parentStyle from './CommunityDemocracyBlock.module.css';
import VoteForm from "../../../components/UI/inputs/VoteForm";
import {useMemo} from "react";

function VoteFormCandidateList({isElectionsNow, candidateList}) {

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
        else
            return null
    }, [candidateList.previousCndidates, candidateList.currentCandidates])

    return (
        <div className={parentStyle.showMoreInfo}>
            <div className={style.voteForm}>
                { isElectionsNow ?
                    <VoteForm
                        votedId={candidateList.votedId}
                        options={voteOptions}
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
                bu
            </div>
        </div>
    );
}

export default VoteFormCandidateList;