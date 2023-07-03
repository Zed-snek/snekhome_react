import React from 'react';
import style from "./CommunityCitizenRole.module.css";
import MyInput from "../../../components/UI/inputs/MyInput";

function CommunityDemocracySettings({settings, setSettings}) {

    function changeDays(e) {
        setSettings(prev => ({...prev, citizenDays: e.target.value}))
    }
    function changeRating(e) {
        setSettings(prev => ({...prev, citizenRating: e.target.value}))
    }
    function changeElectionDays(e) {
        setSettings(prev => ({...prev, electionDays: e.target.value}))
    }

    return (
        <div className={style.settingsDiv}>
            <div className={style.citizenRequirements}>
                <div className={style.title}>
                    Citizen requirements
                </div>
                <div className={style.citizenInputsDiv}>
                    <div>
                        <div>
                            Days after joining
                        </div>
                        <MyInput
                            value={settings.citizenDays}
                            type="number"
                            onChange={changeDays}
                            min="3"
                            max="365"
                        />
                    </div>
                    <div>
                        <div>
                            Rating needed
                        </div>
                        <MyInput
                            value={settings.citizenRating}
                            type="number"
                            onChange={changeRating}
                            min="0"
                            max="10000"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className={style.title}>
                    Frequency of elections
                </div>
                <div>
                    <div>
                        How often will elections be in days
                    </div>
                    <MyInput
                        value={settings.electionDays}
                        type="number"
                        onChange={changeElectionDays}
                        min="7"
                        max="365"
                    />
                </div>
            </div>
        </div>
    );
}

export default CommunityDemocracySettings;