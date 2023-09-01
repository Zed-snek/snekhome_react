import React, {useState} from 'react';
import style from "./CreateCommunitySettings.module.css";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import BooleanBlock from "../../../components/structureComponents/BooleanBlock";

function CreateCommunitySettingsPage({chosen, settings, setSettings}) {


    function handleClosedCommunity(e) {
        setSettings(prev => ({...prev, isClosed: e.target.checked}))
        if (chosen !== 1) //1 = anarchy
            setShowInviteUsers(e.target.checked)
        if (!e.target.checked)
            setSettings(prev => ({...prev, inviteUsers: false}))
    }
    function handleAnonCommunity(e) {
        setSettings(prev => ({...prev, anonAllowed: e.target.checked}))
    }
    function handleInviteUsers(e) {
        setSettings(prev => ({...prev, inviteUsers: e.target.checked}))
    }

    const [showInviteUsers, setShowInviteUsers] = useState(settings.isClosed)


    return (
        <div className={style.main}>

            <div className={style.item}>
                <div className={style.title}>
                    Anonymous posts
                </div>
                <div className={style.description}>
                    If you allow anonymous posts, that will be mean anyone can post anything and no one will know who has posted it.
                </div>
                <MyCheckbox
                    checked={settings.anonAllowed}
                    onChange={handleAnonCommunity}
                    label="Allow"
                />
            </div>


            <div className={style.item}>
                <div className={style.title}>
                    Is community closed
                </div>
                <div className={style.description}>
                    Only members are allowed to see content and invite other users.
                </div>
                <MyCheckbox
                    checked={settings.isClosed}
                    onChange={handleClosedCommunity}
                    label="Make community closed"
                />
            </div>


            <BooleanBlock
                bool={showInviteUsers}
            >
                <div className={style.item}>
                    <div className={style.title}>
                        Inviting users
                    </div>
                    <div className={style.description}>
                        When community is closed, new users can be only invited to community. Can non ranked members invite other users?
                    </div>
                    <MyCheckbox
                        checked={settings.inviteUsers}
                        onChange={handleInviteUsers}
                        label="Allow invite users"
                    />
                </div>
            </BooleanBlock>


        </div>
    );
}

export default CreateCommunitySettingsPage;