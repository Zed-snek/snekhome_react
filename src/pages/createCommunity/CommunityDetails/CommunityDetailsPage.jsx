import React from 'react';
import style from "./CommunityDetails.module.css"
import MyInputOld from "../../../components/UI/inputs/MyInputOld";
import MyTextArea from "../../../components/UI/inputs/MyTextArea";

function CommunityDetailsPage({chosen, setSettings}) {

    function handleId(e) {
        setSettings(prev => ({...prev, idName: e.target.value}))
    }
    function handleName(e) {
        setSettings(prev => ({...prev, name: e.target.value}))
    }
    function handleDescription(e) {
        setSettings(prev => ({...prev, description: e.target.value}))
    }

    return (
        <div className={style.main}>

            <div className="row row-cols-1 row-cols-lg-2">

                <div>
                    <label htmlFor="communityId"> Community id: </label>
                    <MyInputOld
                        type="text"
                        placeholder="community id.."
                        maxLength={18}
                        id="communityId"
                        onChange={handleId}
                    />
                </div>

                <div>
                    <label htmlFor="name">Community name:</label>
                    <MyInputOld
                        type="text"
                        placeholder="community name.."
                        id="name"
                        maxLength={25}
                        onChange={handleName}
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <MyTextArea
                        maxLength={512}
                        onChange={handleDescription}
                        placeholder="description.."
                    >

                    </MyTextArea>
                </div>

            </div>

        </div>
    );
}

export default CommunityDetailsPage;