import React from 'react';
import style from "./CommunityCitizenRole.module.css"
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyInput from "../../../components/UI/inputs/MyInput";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import CommunityDemocracySettings from "./CommunityDemocracySettings";

function CommunityCitizenRolePage({isClosed, settings, setSettings}) {

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

            <CommunityDemocracySettings
                settings={settings}
                setSettings={setSettings}
            />


        </div>
    );
}

export default CommunityCitizenRolePage;