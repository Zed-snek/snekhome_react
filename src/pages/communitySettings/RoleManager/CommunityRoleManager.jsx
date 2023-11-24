import {useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CommunityRoleItem from "./CommunityRoleItem";
import CommunityRoleForm from "./CommunityRoleForm";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import {useGetRoles} from "../useGetRoles";
import {useDocumentTitle} from "usehooks-ts";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";

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
                            <BorderBottomDiv
                                key={index}
                                className={style.borderBottom}
                            >
                                <CommunityRoleItem
                                    role={role}
                                    groupname={groupname}
                                    typesToMap={typesToMap}
                                    setIsLoader={setIsLoader}
                                    setError={setError}
                                    setRoles={setRoles}
                                    isEdit={isEditPermission}
                                />
                            </BorderBottomDiv>
                        )
                    : <></> }
                </div>
            </div>

            <div className={style.createRoleDiv}>
                <CommunityRoleForm
                    groupname={groupname}
                    isCreate={true}
                    typesToMap={typesToMap}
                    setIsLoader={setIsLoader}
                    setError={setError}
                    setRoles={setRoles}
                    setIsShow={setIsShowCreateForm}
                    isShow={isShowCreateForm}
                    formTitle="Create a new role:"
                />
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