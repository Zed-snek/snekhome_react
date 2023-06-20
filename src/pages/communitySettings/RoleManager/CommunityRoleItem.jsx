import React, {useState} from 'react';
import style from './CommunityRoleManager.module.css';
import edit from "../../../images/icons/edit.svg";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import CommunityRoleFlair from "../../../components/community/CommunityRoleFlair";
import CommunityRoleForm from "./CommunityRoleForm";
import OverContentDiv from "../../../components/UI/blocks/OverContentDiv";

function CommunityRoleItem({role, typesToMap, groupname, setError, setIsLoader, setRoles}) {

    const allowed = <span className={style.allowed}>✓</span>
    const disAllowed = <span className={style.disAllowed}>✗</span>

    const [isShowCreateForm, setIsShowCreateForm] = useState(false)

    return (
        <div className={style.item}>
            <div>
                <CommunityRoleFlair
                    title={role.title}
                    textColor={role.textColor}
                    color={role.bannerColor}
                />
            </div>

            <div>
                <MyTransparentButton className={style.edit} tooltip="Edit" onClick={() => setIsShowCreateForm(true)}>
                    <img src={edit} alt="edit"/>
                </MyTransparentButton>
            </div>

            <div className={style.itemPermissions}>
                { typesToMap.map( (t, index) =>
                    <div key={index} className={style.itemIsAllowed}>
                        <div className={style.permissionTitle}>
                            {t.title2}
                        </div>
                        <div>
                            {role[t.title] ? allowed : disAllowed}
                        </div>
                    </div>
                ) }
            </div>

            <OverContentDiv
                className={style.formWindow}
                isShow={isShowCreateForm}
                setIsShow={setIsShowCreateForm}
                title="Edit a role:"
            >
                <CommunityRoleForm
                    groupname={groupname}
                    isCreate={false}
                    typesToMap={typesToMap}
                    setIsLoader={setIsLoader}
                    setError={setError}
                    setRoles={setRoles}
                    setIsShow={setIsShowCreateForm}
                    roleToEdit={role}
                />
            </OverContentDiv>

        </div>
    );
}

export default CommunityRoleItem;