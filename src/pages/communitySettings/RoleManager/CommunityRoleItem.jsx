import {useState} from 'react';
import style from './CommunityRoleManager.module.css';
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import CommunityRoleFlair from "../../../components/community/CommunityRoleFlair";
import CommunityRoleForm from "./CommunityRoleForm";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import EditSvg from "../../../components/svg/EditSvg";

function CommunityRoleItem({role, typesToMap, groupname, setError, setIsLoader, setRoles, isEdit}) {

    const allowed = <span className={style.allowed}>✓</span>
    const disAllowed = <span className={style.disAllowed}>✗</span>

    const [isShowCreateForm, setIsShowCreateForm] = useState(false)

    return (
        <BorderBottomDiv className={style.item}>
            <div>
                <CommunityRoleFlair
                    title={role.title}
                    textColor={role.textColor}
                    bannerColor={role.bannerColor}
                />
            </div>

            { isEdit ?
                <div>
                    <MyTransparentButton
                        className={style.edit}
                        tooltip="Edit"
                        onClick={() => setIsShowCreateForm(true)}
                    >
                        <EditSvg />
                    </MyTransparentButton>
                </div>
            : <></> }

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

            { isEdit ?
                <CommunityRoleForm
                    groupname={groupname}
                    isCreate={false}
                    typesToMap={typesToMap}
                    setIsLoader={setIsLoader}
                    setError={setError}
                    setRoles={setRoles}
                    isShow={isShowCreateForm}
                    setIsShow={setIsShowCreateForm}
                    formTitle="Edit a role:"
                    roleToEdit={role}
                />
            : <></> }

        </BorderBottomDiv>
    );
}

export default CommunityRoleItem;