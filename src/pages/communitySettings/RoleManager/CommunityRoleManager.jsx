import React, {useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CommunityRoleItem from "./CommunityRoleItem";
import CommunityRoleForm from "./CommunityRoleForm";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import OverContentDiv from "../../../components/UI/blocks/OverContentDiv";
import {useGetRoles} from "../useGetRoles";

function CommunityRoleManager({communityType, groupname, setError, setIsLoader}) {


    const [typesToMap, roles, setRoles] = useGetRoles(setError, setIsLoader, groupname, communityType)

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
                                    isEdit={true}
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