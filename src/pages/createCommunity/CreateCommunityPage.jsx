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
import CommunityService from "../../API/CommunityService";
import {useNavigate} from "react-router-dom";

function CreateCommunityPage() {

    useDocumentTitle("New community")
    const navigate = useNavigate()

    const [isMessageModal, setIsMessageModal] = useState(false)
    const [messageModal, setMessageModal] = useState('')

    const titles = ["Choose community type", "Set settings", "Set details of new community", "Create citizen role"]
    const [stage, setStage] = useState(0) //0 = choosing, 1 = settings, 2 = details, 3 = citizen role

    const types = ["CORPORATE", "ANARCHY", "DEMOCRACY", "NEWSPAPER"]
    const [type, setType] = useState(-1) //0 = corporate, 1 = anarchy, 2 = democracy, 3 = newspaper

    const [settings, setSettings] = useState({
        anonAllowed: false,
        isClosed: false,
        idName: '',
        name: '',
        description: '',
        inviteUsers: false,
        //democracy parameters:
        bannerColor: '#E9105E',
        textColor: '#E3E3E3',
        title: 'citizen',
        citizenDays: 60,
        citizenRating: 150,
        electionDays: 30
    })

    // const [isGroupNameNotTaken, setIsGroupNameNotTaken] = useState(false)

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
                if (!isNotBannedSymbols(settings.idName) || !settings.idName) {
                    setMessageModal("Group id required and must have only allowed symbols: A-Z, a-z, 0-9, _, - ")
                    setIsMessageModal(true)
                }
                else {
                    fetchIsNameNotTaken()
                }
                break
            case 3:
                if (!settings.title) {
                    setMessageModal("Provide the title of citizen role flair")
                    setIsMessageModal(true)
                }
                else if (settings.citizenDays < 3 || settings.citizenDays > 365) {
                    setMessageModal("The amount of days, member needs to become a citizen must be in range: [3, 365]")
                    setIsMessageModal(true)
                }
                else if (settings.citizenRating < 0 || settings.citizenRating > 10000) {
                    setMessageModal("The amount of rating, member needs to become a citizen must be in range: [0, 10000]")
                    setIsMessageModal(true)
                }
                else if (settings.electionDays < 7 || settings.electionDays > 365) {
                    setMessageModal("The amount of days with which elections will be must be in range: [0, 10000]")
                    setIsMessageModal(true)
                }
                else {
                    fetchNewCommunity()
                }
                break
        }
    }

    const [fetchNewCommunity, isFetchLoading, errorFetch] = useFetching(async () => {
        await CommunityService.newCommunity({...settings, type: types[type]})
        navigate("/c/" + settings.idName)
    })


    const [isNameNotTaken, setIsNameNotTaken] = useState(false)
    const [fetchIsNameNotTaken, isNameTakenLoading, errorNameTaken] = useFetching(async () => {
        if (await CommunityService.isNameNotTaken(settings.idName)) {
            setIsNameNotTaken(true)
        }
    })
    useEffect(() => { //case 2 in handleClick()
        if (isNameNotTaken) {
            if (type === 2) {
                setStage(s => s + 1)
            }
            else {
                fetchNewCommunity()
            }
        }
    }, [isNameNotTaken])

    //errors
    useEffect(() => {
        if (errorFetch) {
            setMessageModal(errorFetch)
            setIsMessageModal(true)
        }
    }, [errorFetch])
    useEffect(() => {
        if (errorNameTaken) {
            setMessageModal(errorNameTaken)
            setIsMessageModal(true)
        }
    }, [errorNameTaken])



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
                    settings={settings}
                    setSettings={setSettings}
                    isClosed={settings.isClosed}
                />
        }
    }

    return (
        <OutlineDiv>
            <InfoDiv className={style.main}>

                <h2>
                    {titles[stage]}
                    <MySyncLoader loading={isFetchLoading || isNameTakenLoading} />
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