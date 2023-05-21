import React, {useEffect} from 'react';
import MyButton from "../../components/UI/buttons/MyButton";
import style from "./CreateCommunityPage.module.css";

function CreateCommunityNextBtn({type, stage, onClick}) {

    function content() {
        if (type === 2) {//democracy
            if (stage === 3)//stage citizen role
                return "Create community"
        }
        else if (stage === 2) {
            return "Create community"
        }
        return "Next step"
    }

    return (
        <div className={style.nextBtnDiv}>
            <MyButton onClick={onClick}>
                {content()}
            </MyButton>
        </div>
    );
}

export default CreateCommunityNextBtn;