import React, {useEffect, useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";

function CommunityRoleManager({communityType, groupname, setError, setIsLoader}) {

    const [flair, setFlair] = useState({title: 'new', textColor: '#E3E3E3', bannerColor: 'cadetblue'})

    const allowTypes = [
        {title: "editDescription", value: "Allow to edit image, name and description", toShow: true},
        {title: "editId", value: "Allow to edit groupname of community", toShow: true},
        {title: "deletePosts", value:  "Allow to delete posts", toShow: true},
        {title: "banUser", value: "Allow to ban users", toShow: true},
        {title: "banCitizen", value: "Allow to ban citizens", toShow: communityType === 'DEMOCRACY'}
    ]

    const [isTypeAllowed, setIsTypeAllowed] = useState(
        {
            editDescription: false,
            editId: false,
            deletePosts: false,
            banUser: false,
            banCitizen: false
        }
    )

    const typesToMap = allowTypes.filter(t => t.toShow)

    const [fetchNewRole, isFetchLoading, fetchError] = useFetching(async () => {
        await CommunityService.newRole({...flair, ...isTypeAllowed}, groupname)
    })

    useEffect(() => {
        setIsLoader(isFetchLoading)
    }, [isFetchLoading])
    useEffect(() => {
        if (fetchError)
            setError(fetchError)
    }, [fetchError])

    function createRole(e) {
        e.preventDefault()
        fetchNewRole()
    }

    return (
        <div>

            <BorderBottomDiv className={style.roleCreator}>
                <form onSubmit={createRole}>
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
                                    <MyCheckbox
                                        key={index}
                                        label={t.value}
                                        onChange={e => setIsTypeAllowed(prev => {
                                            let obj = {...prev}
                                            obj[t.title] = e.target.checked
                                            return obj
                                        })}
                                    />
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
            </BorderBottomDiv>

            <div>
                <div className={style.titleDiv}>
                    <h2>Edit roles</h2>
                </div>
            </div>

        </div>
    );
}

export default CommunityRoleManager;