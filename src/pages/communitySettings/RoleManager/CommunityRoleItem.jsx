import React, {useEffect} from 'react';
import style from './CommunityRoleManager.module.css';
import edit from "../../../images/icons/edit.svg";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import CommunityRoleFlair from "../../../components/community/CommunityRoleFlair";

function CommunityRoleItem({role, setEdit, types}) {

    const allowed = <span className={style.allowed}>✓</span>
    const disAllowed = <span className={style.disAllowed}>✗</span>

    useEffect(() => {
        console.log("Role: ", role)
    }, [])

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
                <MyTransparentButton className={style.edit} tooltip="Edit" onClick={() => setEdit(role.title)}>
                    <img src={edit} alt="edit"/>
                </MyTransparentButton>
            </div>

            <div className={style.itemPermissions}>
                { types.map( (t, index) =>
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
        </div>
    );
}

export default CommunityRoleItem;