import React, {useState} from 'react';
import {useDocumentTitle} from "usehooks-ts";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import style from "./CreateCommunityPage.module.css";
import ChooseCommunityPage from "./ChooseCommunity/ChooseCommunityPage";

function CreateCommunityPage() {

    useDocumentTitle("New community")

    const titles = ["Choose community type", "Set settings", "Set details of new community", "Create citizen role"]

    const [stage, setStage] = useState(0) //0 = choosing, 1 = settings, 2 = details, 3 = citizen role
    const [type, setType] = useState(0) //0 = corporate, 1 = democracy, 2 = anarchy, 3 = newspaper

    function stageContent() {
        switch (stage) {
            case 0:
                return <ChooseCommunityPage />
            case 1:
                return "Settings"
            case 2:
                return "Details"
            case 3:
                return "Creating role" //only for democracy
        }
    }

    return (
        <OutlineDiv>
            <InfoDiv className={style.main}>
                <h2> {titles[type]} </h2>
                {stageContent()}
            </InfoDiv>
        </OutlineDiv>
    );
}

export default CreateCommunityPage;