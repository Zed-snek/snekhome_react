import React from 'react';
import style from "./CommunitySettings.module.css";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import BooleanBlock from "../../../components/UI/blocks/BooleanBlock";

function CommunitySettingsPage({chosen}) {

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
                    label="Allow"
                />
            </div>

            <BooleanBlock
                bool={chosen !== 3}
            >
                <div className={style.item}>
                    <div className={style.title}>
                        Is community closed
                    </div>
                    <div className={style.description}>
                        If you allow anonymous posts, that will be mean anyone can post anything and no one will know who has posted it.
                    </div>
                    <MyCheckbox
                        label="Make community closed"
                    />
                </div>
            </BooleanBlock>


        </div>
    );
}

export default CommunitySettingsPage;