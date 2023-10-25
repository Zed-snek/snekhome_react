import style from './VoteForm.module.css';
import {useState} from "react";
import {useClasses} from "../../../hooks/useClasses";
import MyButton from "../buttons/MyButton";

function VoteForm({className, options, onVoteCallback, votedId, isResult, totalVotes}) {

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
                            const percentage = ((element.votes / totalVotes) * 100).toFixed(1)
                            return (
                                <div
                                    className={style.relative}
                                >
                                    <div className={style.percentageLineDiv} style={{width: percentage + "%"}} />

                                    <div className={style.voted + " " + (isVotedOption ? style.votedOption : "")}>
                                        <div>
                                            {element.title}
                                        </div>
                                        <div>
                                            {isVotedOption ? "✓" : ""} {percentage}%
                                        </div>
                                    </div>
                                </div>
                        )})()
                        :
                        <div
                            className={
                                (isVoted ? style.voted : style.notVoted) + " " +
                                (isVotedOption || element.id === chosenValue ? style.votedOption : "") + " " +
                                (isVotedOption === votedId ? style.votedOption : "")
                            }
                            onClick={() => {
                                if (!isVoted)
                                    setChosenValue(element.id)
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

            { isVoted || isResult
                ? <></>
                : <div>
                   <MyButton onClick={() => onVoteCallback(chosenValue)} className={style.voteButton}>
                       Vote
                   </MyButton>
                </div>
            }
        </div>
    );
}

export default VoteForm;