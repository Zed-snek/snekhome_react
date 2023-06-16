import React from 'react';
import style from "./CommunityCitizenRole.module.css"
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyInput from "../../../components/UI/inputs/MyInput";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";

function CommunityCitizenRolePage({isClosed, settings, setSettings}) {


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
        <div>
            <BorderBottomDiv className={style.description}>
                Citizen role is a role for not moderators members. Allows to vote in president elections.

                { isClosed ?
                    " If community is closed, citizen role allows to invite other users. "
                    : ' '}
                You have to set up citizen role flair: choose the title, color of the flair and its color of text.

            </BorderBottomDiv>


            <BorderBottomDiv>
                <CreateCommunityRoleFlair flair={settings} setFlair={setSettings}/>
            </BorderBottomDiv>


            <div className={style.description}>
                Now, set up how many days user must be a member in community and how many rating
                points he has to get (both positive and negative rating) to become citizen. And after this choose how often will elections be.
            </div>
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


        </div>
    );
}

export default CommunityCitizenRolePage;