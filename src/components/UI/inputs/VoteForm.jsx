import style from './VoteForm.module.css';
import {useState} from "react";
import {useClasses} from "../../../hooks/useClasses";
import MyButton from "../buttons/MyButton";

function VoteForm({className, options, onVoteCallback, votedId}) {

    const classes = useClasses(style.main, className)

    const [chosenValue, setChosenValue] = useState(-1)

    const isVoted = votedId !== -1

    return (
        <div className={classes}>
            { options.map((element, index) =>
                <div key={index}>
                    { isVoted ?
                        (() => {
                            const totalVotes = options.reduce((accumulator, element) => accumulator + element.votes, 0)
                            const percentage = ((element.votes / totalVotes) * 100).toFixed(1)
                            const isVotedOption = element.id === votedId
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
                            className={style.notVoted + " " + (element.id === chosenValue ? style.votedOption : "")}
                            onClick={() => setChosenValue(element.id)}
                        >
                            {element.title}
                        </div>
                    }
                </div>
            )}

            { !isVoted ?
               <div>
                   <MyButton onClick={() => onVoteCallback(chosenValue)} className={style.voteButton}>
                       Vote
                   </MyButton>
               </div>
            : <></> }
        </div>
    );
}

export default VoteForm;