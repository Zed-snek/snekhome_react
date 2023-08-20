import style from "./commentary.module.css";
import MyGreyOutlineButton from "../../UI/buttons/MyGreyOutlineButton";

function ReplyButton({isReply, setIsReply, isShow}) {

    if (isShow)
        return (
            <MyGreyOutlineButton
                onClick={() => setIsReply(prev => !prev)}
                className={isReply ? style.replyBtnActive : ''}
            >
                Reply
            </MyGreyOutlineButton>
        );

    return <></>
}

export default ReplyButton;