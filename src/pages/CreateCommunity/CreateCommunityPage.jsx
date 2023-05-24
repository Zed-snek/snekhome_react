import React, {useEffect, useState} from 'react';
import {useDocumentTitle} from "usehooks-ts";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import style from "./CreateCommunityPage.module.css";
import ChooseCommunityPage from "./ChooseCommunity/ChooseCommunityPage";
import CreateCommunityNextBtn from "./CreateCommunityNextBtn";
import MessageModal from "../../components/UI/modal/MessageModal";
import CommunitySettingsPage from "./CommunitySettings/CommunitySettingsPage";
import CommunityDetailsPage from "./CommunityDetails/CommunityDetailsPage";
import {isNotBannedSymbols} from "../../functions/stringFunctions";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import CommunityCitizenRolePage from "./CommunityCitizenRole/CommunityCitizenRolePage";

function CreateCommunityPage() {

    useDocumentTitle("New community")

    const [isMessageModal, setIsMessageModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')

    const titles = ["Choose community type", "Set settings", "Set details of new community", "Create citizen role"]
    const [stage, setStage] = useState(0) //0 = choosing, 1 = settings, 2 = details, 3 = citizen role

    const types = ["CORPORATE", "ANARCHY", "DEMOCRACY", "NEWSPAPER"]
    const [type, setType] = useState(-1) //0 = corporate, 1 = anarchy, 2 = democracy, 3 = newspaper

    const [settings, setSettings] = useState({ //todo add citizen role: title, bannerColor
        anonAllowed: false,
        isClosed: false,
        idName: '',
        name: '',
        description: '',
        inviteUsers: false
    })


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
                break

            case 1:
                setStage(stage + 1)
                break

            case 2:
                if (settings.idName && isNotBannedSymbols(settings.idName)) {
                    if (type === 2) {
                        setStage(stage + 1)
                    }
                    else {
                        fetchNewCommunity()
                    }
                }
                else {
                    setMessageModal("Group id required and must have only allowed symbols: A-Z, a-z, 0-9, _, - ")
                    setIsMessageModal(true)
                }
                break
            case 3:
                fetchNewCommunity()
                break
        }
    }

    const [fetchNewCommunity, isFetchLoading, errorFetch] = useFetching(() => {
        console.log({...settings, type: types[type]})
    })


    function stageContent() {
        switch (stage) {
            case 0:
                return <ChooseCommunityPage
                    setChosen={setType}
                    chosen={type}
                />
            case 1:
                return <CommunitySettingsPage
                    setSettings={setSettings}
                    chosen={type}
                />
            case 2:
                return <CommunityDetailsPage
                    setSettings={setSettings}
                    chosen={type}
                />
            case 3:
                return <CommunityCitizenRolePage
                    setSettings={setSettings}
                />
        }
    }


    return (
        <OutlineDiv>
            <InfoDiv className={style.main}>

                    <h2>
                        {titles[stage]}
                        <MySyncLoader loading={isFetchLoading} />
                    </h2>

                {stageContent()}

                <CreateCommunityNextBtn
                    onClick={handleClick}
                    type={type}
                    stage={stage}
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