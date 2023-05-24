import React from 'react';
import style from "./CommunityCitizenRole.jsx.css"
import CreateCommunityRole from "../../../components/community/CreateCommunityRole";

function CommunityCitizenRolePage({setSettings}) {


    return (
        <div className={style.main} >

            <CreateCommunityRole />

        </div>
    );
}

export default CommunityCitizenRolePage;