import style from './VoteFormCandidateList.module.css';
import parentStyle from './CommunityDemocracyBlock.module.css';
import VoteForm from "../../../components/UI/inputs/VoteForm";
import {useMemo} from "react";
import CandidateItem from "./CandidateItem";

function VoteFormCandidateList({isElectionsNow, isCitizenRight, candidateList}) {

    const voteOptions = useMemo(() => {
        console.log(candidateList)
        let options = isElectionsNow ? candidateList.currentCandidates : candidateList.previousCandidates
        if (options?.length > 0) {
            options = options.map(({nickname, votes}, index) => {
                return {
                    id: index,
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
    }, [candidateList.previousCandidates, candidateList.currentCandidates])


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