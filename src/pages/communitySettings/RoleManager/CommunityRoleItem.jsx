import {useState} from 'react';
import style from './CommunityRoleManager.module.css';
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import CommunityRoleFlair from "../../../components/community/CommunityRoleFlair";
import CommunityRoleForm from "./CommunityRoleForm";
import EditSvg from "../../../components/svg/EditSvg";
import CheckMark from "../../../components/UI/symbols/CheckMark";
import XMark from "../../../components/UI/symbols/XMark";
import {useClasses} from "../../../hooks/useClasses";

function CommunityRoleItem({role, typesToMap, groupname, setError, setIsLoader, setRoles, isEdit, className}) {

    const [isShowCreateForm, setIsShowCreateForm] = useState(false)

    const classes = useClasses(style.item, className)

    return (
        <div className={classes}>
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
                            {role[t.title] ? <CheckMark /> : <XMark />}
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
        </div>
    );
}

export default CommunityRoleItem;