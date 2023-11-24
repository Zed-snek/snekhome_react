import style from './VoteForm.module.css';
import {useState} from "react";
import {useClasses} from "../../../hooks/useClasses";
import MyButton from "../buttons/MyButton";
import MyMessage from "../message/MyMessage";

function VoteForm({className, options, onVoteCallback, votedId, isResult, totalVotes, isAllowToVote}) {

    const classes = useClasses(style.main, className)

    const [chosenValue, setChosenValue] = useState(-1)

    const isVoted = votedId !== -1

    return (
        <div className={classes}>
            { options?.map((element, index) => {
                const isVotedOption = element.id === votedId

                return <div key={index}>
                    { isResult ?
                        (() => {
                            let percentage
                            if (!element.votes || element.votes === 0)
                                percentage = 0
                            else
                                percentage = ((element.votes / totalVotes) * 100).toFixed(1)

                            return (
                                <div className={style.relative}>
                                    <div className={style.percentageLineDiv} style={{width: percentage + "%"}} />

                                    <div className={style.voted + " " + (isVotedOption ? style.votedOption : "")}>
                                        <div className={style.title}>
                                            {element.title}
                                        </div>
                                        <div>
                                            {isVotedOption ? "✓" : ""} {percentage}%
                                        </div>
                                    </div>
                                </div>
                        )})()
                        :
                        <div className={
                                (isVoted ? style.voted : style.notVoted) + " " +
                                (isVotedOption || element.index === chosenValue ? style.votedOption : "") + " " +
                                (isVotedOption === votedId ? style.votedOption : "")
                            }
                            onClick={() => {
                                if (!isVoted)
                                    setChosenValue(element.index)
                            }}
                        >
                            <div>
                                {element.title}
                            </div>
                            <div>
                                {isVotedOption ? "✓" : ""}
                            </div>
                        </div>
                    }
                </div>
            })}

            <MyMessage>
                { !options || options.length === 0 ? "No options to vote" : ""}
            </MyMessage>

            { isVoted || isResult
                ? <></>
                : <div>
                   <MyButton
                       onClick={() => onVoteCallback(chosenValue)}
                       className={style.voteButton}
                       disabled={isAllowToVote === false}
                   >
                       Vote
                   </MyButton>
                </div>
            }
        </div>
    );
}

export default VoteForm;