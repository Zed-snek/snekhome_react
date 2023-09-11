import React, {useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CommunityRoleItem from "./CommunityRoleItem";
import CommunityRoleForm from "./CommunityRoleForm";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import OverContentDiv from "../../../components/UI/blocks/OverContentDiv";
import {useGetRoles} from "../useGetRoles";
import {useDocumentTitle} from "usehooks-ts";

function CommunityRoleManager({communityType, groupname, isCommunityClosed, setError, setIsLoader, isEditPermission}) {

    useDocumentTitle("Role manager")

    const [typesToMap, roles, setRoles] =
        useGetRoles(setError, setIsLoader, groupname, communityType, isCommunityClosed)

    const [isShowCreateForm, setIsShowCreateForm] = useState(false)

    return (
        <div>

            <div className={style.titleDiv}>
                <h2>Role manager</h2>
            </div>

            <div className={style.roleItemsDiv}>
                <div className={style.roleItems}>
                    { roles.length > 0 ?
                        roles.map((role, index) =>
                            <CommunityRoleItem
                                key={index}
                                role={role}
                                groupname={groupname}
                                typesToMap={typesToMap}
                                setIsLoader={setIsLoader}
                                setError={setError}
                                setRoles={setRoles}
                                isEdit={isEditPermission}
                            />
                        )
                    : <></> }
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
                { isEditPermission ?
                    <MyTransparentButton
                        className={style.button}
                        onClick={() => setIsShowCreateForm(prev => !prev)}
                    >
                        Create new role
                    </MyTransparentButton>
                : <></> }
            </div>

        </div>
    );
}

export default CommunityRoleManager;