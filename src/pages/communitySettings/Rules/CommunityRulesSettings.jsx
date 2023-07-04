import React, {useEffect, useState} from 'react';
import CreateCommunitySettingsPage from "../../createCommunity/communitySettings/CreateCommunitySettingsPage";
import style from "./CommunityRulesSettings.module.css";
import MyButton from "../../../components/UI/buttons/MyButton";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import {useDocumentTitle} from "usehooks-ts";

function CommunityRulesSettings({communityType, startSettings, setStartSettings, setError, setIsLoader, groupname}) {

    useDocumentTitle("Community rules settings")
    const [settings, setSettings] = useState(startSettings)

    const [fetchUpdate, isFetchUpdateLoading, fetchUpdateError] = useFetching(async () => {
        await CommunityService.updateCommunitySettings(groupname, settings)
        setStartSettings(settings.anonAllowed, settings.isClosed, settings.inviteUsers)
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
        <div className={style.main}>
            <CreateCommunitySettingsPage
                settings={settings}
                setSettings={setSettings}
                chosen={communityType === "ANARCHY" ? 1 : 0}
            />
            <div className={style.button}>
                <MyButton onClick={acceptBtn}>
                    Accept
                </MyButton>
            </div>
        </div>
    );
}

export default CommunityRulesSettings;