import React, {useEffect, useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import CommunityRoleItem from "./CommunityRoleItem";

function CommunityRoleManager({communityType, groupname, setError, setIsLoader}) {

    const [flair, setFlair] = useState({title: 'new', textColor: '#E3E3E3', bannerColor: 'cadetblue'})

    const allowTypes = [
        {title: "editDescription", title2: "edit description", value: "Allow to edit image, name and description", toShow: true},
        {title: "editId", title2: "edit groupname", value: "Allow to edit groupname of community", toShow: true},
        {title: "deletePosts", title2: "delete posts", value:  "Allow to delete posts", toShow: true},
        {title: "banUser", title2: "ban users", value: "Allow to ban users", toShow: true},
        {title: "banCitizen", title2: "ban citizens", value: "Allow to ban citizens", toShow: communityType === 'DEMOCRACY'}
    ]
    const typesToMap = allowTypes.filter(t => t.toShow)

    const [isTypeAllowed, setIsTypeAllowed] = useState(
        {
            editDescription: false,
            editId: false,
            deletePosts: false,
            banUser: false,
            banCitizen: false
        }
    )

    const [roles, setRoles] = useState([])

    const [fetchRoles, isFetchRolesLoading, fetchRolesError] = useFetching(async () => {
        let responseData = await CommunityService.getRoles(groupname)
        console.log("CommunityRoleManager.jsx, fetchRoles responseData: ", responseData)
        setRoles(responseData)
    })

    function setEdit(title) {
        console.log("Role clicked edit: ", roles.find(r => r.title === title))
    }


    const [fetchNewRole, isFetchLoading, fetchError] = useFetching(async () => {
        await CommunityService.newRole({...flair, ...isTypeAllowed}, groupname)
    })

    function createRole(e) {
        e.preventDefault()
        fetchNewRole()
    }

    useEffect(() => {
        setIsLoader(isFetchLoading || isFetchRolesLoading)
    }, [isFetchLoading, isFetchRolesLoading])
    useEffect(() => {
        if (fetchError)
            setError(fetchError)
        else if (fetchRolesError)
            setError(fetchRolesError)
    }, [fetchError, fetchRolesError])

    useEffect(() => {
        fetchRoles()
    }, [])


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
            </BorderBottomDiv>

            <div>
                <div className={style.titleDiv}>
                    <h2>Edit roles</h2>
                </div>
                <div className={style.roleItemsDiv}>
                    <div className={style.roleItems}>
                        {
                            roles.length > 0 ?
                                roles.map((role, index) =>
                                    <CommunityRoleItem
                                        key={index}
                                        role={role}
                                        setEdit={setEdit}
                                        types={typesToMap}
                                    />
                                )
                                : <></>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CommunityRoleManager;