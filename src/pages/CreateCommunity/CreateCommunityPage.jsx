import React, {useState} from 'react';
import {useDocumentTitle} from "usehooks-ts";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import style from "./CreateCommunityPage.module.css";
import ChooseCommunityPage from "./ChooseCommunity/ChooseCommunityPage";
import CreateCommunityNextBtn from "./CreateCommunityNextBtn";
import MessageModal from "../../components/UI/modal/MessageModal";
import CommunitySettingsPage from "./CommunitySettings/CommunitySettingsPage";

function CreateCommunityPage() {

    useDocumentTitle("New community")

    const titles = ["Choose community type", "Set settings", "Set details of new community", "Create citizen role"]
    const [isMessageModal, setIsMessageModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [stage, setStage] = useState(0) //0 = choosing, 1 = settings, 2 = details, 3 = citizen role

    const [type, setType] = useState(-1) //0 = corporate, 1 = anarchy, 2 = democracy, 3 = newspaper


    function handleClick() {
        switch (stage) {
            case 0:
                if (type !== -1) {
                    setStage(stage + 1)
                }
                else {
                    setMessageModal("Hold your horses. Choose the community type first")
                    setIsMessageModal(true)
                }
            case 1:

        }

    }

    function stageContent() {
        switch (stage) {
            case 0:
                return <ChooseCommunityPage
                    setChosen={setType}
                    chosen={type}
                />
            case 1:
                return <CommunitySettingsPage />
            case 2:
                return "Details"
            case 3:
                return "Creating role" //only for democracy
        }
    }

    return (
        <OutlineDiv>
            <InfoDiv className={style.main}>
                <h2> {titles[stage]} </h2>
                {stageContent()}

                <CreateCommunityNextBtn
                    onClick={handleClick}
                />
            </InfoDiv>

            <MessageModal
                visible={isMessageModal}
                setVisible={setIsMessageModal}
            >
                {messageModal}
            </MessageModal>

        </OutlineDiv>
    );
}

export default CreateCommunityPage;