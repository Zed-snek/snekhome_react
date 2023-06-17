import React, {useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";

function CommunityRoleForm({typesToMap, groupname}) {

    const [flair, setFlair] = useState({title: 'new', textColor: '#E3E3E3', bannerColor: 'cadetblue'})

    const [isTypeAllowed, setIsTypeAllowed] = useState(
        {
            editDescription: false,
            editId: false,
            deletePosts: false,
            banUser: false,
            banCitizen: false
        }
    )
    
    const [fetchNewRole, isFetchLoading, fetchError] = useFetching(async () => {
        await CommunityService.newRole({...flair, ...isTypeAllowed}, groupname)
    })

    function manageRole(e) {
        e.preventDefault()
        fetchNewRole()
    }
    
    return (
        <form onSubmit={manageRole}>
            <div className={style.titleDiv}>
                <h2>Role creator</h2>
            </div>
            <div className={style.settings}>
                <div>
                    <CreateCommunityRoleFlair flair={flair} setFlair={setFlair} />
                </div>
                <div>
                    <div className={style.title}>
                        Role permissions
                    </div>
                    {
                        typesToMap.map( (t, index) =>
                            <div key={index} className={style.checkBox}>
                                <MyCheckbox
                                    label={t.value}
                                    onChange={e => setIsTypeAllowed(prev => {
                                        let obj = {...prev}
                                        obj[t.title] = e.target.checked
                                        return obj
                                    })}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                <MyTransparentButton className={style.button}>
                    Create role
                </MyTransparentButton>
            </div>
        </form>
    );
}

export default CommunityRoleForm;