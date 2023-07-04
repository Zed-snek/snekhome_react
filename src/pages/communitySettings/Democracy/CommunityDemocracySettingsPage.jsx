import React, {useState, useEffect} from 'react';
import CommunityDemocracySettings from "../../createCommunity/communityCitizenRole/CommunityDemocracySettings";
import MyButton from "../../../components/UI/buttons/MyButton";
import style from "./CommunityDemocracySettingsPage.module.css";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import {useDocumentTitle} from "usehooks-ts";

function CommunityDemocracySettingsPage({startSettings, setStartSettings, setError, setIsLoader, groupname}) {

    useDocumentTitle("Democracy settings")
    const [settings, setSettings] = useState(startSettings)

    const [fetchUpdate, isFetchUpdateLoading, fetchUpdateError] = useFetching(async () => {
        await CommunityService.updateDemocracySettings(groupname, settings)
        setStartSettings(settings.citizenDays, settings.electionDays, settings.citizenRating)
    })

    useEffect(() => {
        if (fetchUpdateError)
            setError(fetchUpdateError)
    }, [fetchUpdateError])
    useEffect(() => {
        setIsLoader(isFetchUpdateLoading)
    }, [isFetchUpdateLoading])

    function acceptBtn() {
        if (JSON.stringify(settings) === JSON.stringify(startSettings))
            setError("You haven't made any changes")
        else
            fetchUpdate()
    }

    return (
        <div>
            <CommunityDemocracySettings
                settings={settings}
                setSettings={setSettings}
            />
            <div className={style.button}>
                <MyButton onClick={acceptBtn}>
                    Accept
                </MyButton>
            </div>
        </div>
    );
}

export default CommunityDemocracySettingsPage;