import React from 'react';
import style from "./CommunityDetails.module.css"
import MyInputOld from "../../../components/UI/inputs/MyInputOld";

function CommunityDetailsPage({chosen, setSettings}) {


    return (
        <div className={style.main}>

            <div>
                <label htmlFor="groupname">Your name:</label>
                <MyInputOld
                    type="text"
                    placeholder="groupname"
                    name="groupname"
                />
            </div>

        </div>
    );
}

export default CommunityDetailsPage;