import React, {useEffect, useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import CommunityRoleItem from "./CommunityRoleItem";
import CommunityRoleForm from "./CommunityRoleForm";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import OverContentDiv from "../../../components/UI/blocks/OverContentDiv";

function CommunityRoleManager({communityType, groupname, setError, setIsLoader}) {


    const allowTypes = [
        {title: "editDescription", title2: "edit description", value: "Allow to edit image, name and description", toShow: true},
        {title: "editId", title2: "edit groupname", value: "Allow to edit groupname of community", toShow: true},
        {title: "deletePosts", title2: "delete posts", value:  "Allow to delete posts", toShow: true},
        {title: "banUser", title2: "ban users", value: "Allow to ban users", toShow: true},
        {title: "banCitizen", title2: "ban citizens", value: "Allow to ban citizens", toShow: communityType === 'DEMOCRACY'}
    ]
    const typesToMap = allowTypes.filter(t => t.toShow)


    const [roles, setRoles] = useState([])
    const [fetchRoles, isFetchRolesLoading, fetchRolesError] = useFetching(async () => {
        let responseData = await CommunityService.getRoles(groupname)
        setRoles(responseData)
    })

    useEffect(() => {
        setIsLoader(isFetchRolesLoading)
    }, [isFetchRolesLoading])
    useEffect(() => {
        if (fetchRolesError)
            setError(fetchRolesError)
    }, [fetchRolesError])

    useEffect(() => {
        fetchRoles()
    }, [])

    const [isShowCreateForm, setIsShowCreateForm] = useState(false)

    return (
        <div>

            <div className={style.titleDiv}>
                <h2>Role manager</h2>
            </div>

            <div className={style.roleItemsDiv}>
                <div className={style.roleItems}>
                    {
                        roles.length > 0 ?
                            roles.map((role, index) =>
                                <CommunityRoleItem
                                    key={index}
                                    role={role}
                                    groupname={groupname}
                                    typesToMap={typesToMap}
                                    setIsLoader={setIsLoader}
                                    setError={setError}
                                    setRoles={setRoles}
                                />
                            )
                            : <></>
                    }
                </div>
            </div>

            <div className={style.createRoleDiv}>
                <OverContentDiv
                    className={style.formWindow}
                    isShow={isShowCreateForm}
                    setIsShow={setIsShowCreateForm}
                    title="Create a new role:"
                >
                    <CommunityRoleForm
                        groupname={groupname}
                        isCreate={true}
                        typesToMap={typesToMap}
                        setIsLoader={setIsLoader}
                        setError={setError}
                        setRoles={setRoles}
                        setIsShow={setIsShowCreateForm}
                    />
                </OverContentDiv>
                <MyTransparentButton
                    className={style.button}
                    onClick={() => setIsShowCreateForm(prev => !prev)}
                >
                    Create new role
                </MyTransparentButton>
            </div>

        </div>
    );
}

export default CommunityRoleManager;