import React, {useEffect, useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import BooleanBlock from "../../../components/UI/blocks/BooleanBlock";
import MyButton from "../../../components/UI/buttons/MyButton";

function CommunityRoleForm({isCreate, typesToMap, groupname, setRoles, setError, setIsLoader, setIsShow, roleToEdit}) {

    const [flair, setFlair] = useState(isCreate
        ? {title: 'new', textColor: '#E3E3E3', bannerColor: 'cadetblue'}
        : {title: roleToEdit.title, textColor: roleToEdit.textColor, bannerColor: roleToEdit.bannerColor}
    )


    const [isTypeAllowed, setIsTypeAllowed] = useState(
        isCreate
            ? {
                editDescription: false,
                editId: false,
                deletePosts: false,
                banUser: false,
                banCitizen: false
            }
            : {
                editDescription: roleToEdit.editDescription,
                editId: roleToEdit.editId,
                deletePosts: roleToEdit.deletePosts,
                banUser: roleToEdit.banUser,
                banCitizen: roleToEdit.banCitizen
            }
    )
    
    const [fetchRole, isFetchLoading, fetchError] = useFetching(async () => {
        let role = {...flair, ...isTypeAllowed}
        if (isCreate) {
            await CommunityService.newRole(role, groupname)
            setRoles(prev => [...prev, role])
        }
        else {
            await CommunityService.updateRole(role, groupname, roleToEdit.title)
            setRoles(prev => prev.map(r => r.title === roleToEdit.title ? role : r))
        }
        setIsShow(false)
        setIsLoader(false)
    })

    function manageRole(e) {
        e.preventDefault()
        fetchRole()
    }

    function deleteRole(e) {
        e.preventDefault()
        setIsShow(false)
    }

    useEffect(() => {
        setIsLoader(isFetchLoading)
    }, [isFetchLoading])
    useEffect(() => {
        if (fetchError)
            setError(fetchError)
    }, [fetchError])
    
    return (
        <form onSubmit={manageRole}>

            <div className={style.settings}>
                <div>
                    <CreateCommunityRoleFlair flair={flair} setFlair={setFlair} />
                </div>

                <div className={style.formRightDiv}>

                    <div>
                        <div className={style.title}>
                            Role permissions
                        </div>
                        {
                            typesToMap.map( (t, index) =>
                                <div key={index} className={style.checkBox}>
                                    <MyCheckbox
                                        disabled={roleToEdit ? roleToEdit.creator : false}
                                        label={t.value}
                                        checked={isTypeAllowed[t.title]}
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

                    <BooleanBlock bool={!isCreate} className={style.formDeleteBtn}>
                        <MyButton color='red' onClick={deleteRole}>
                            Delete role
                        </MyButton>
                    </BooleanBlock>

                </div>

            </div>

            <div>
                <MyTransparentButton className={style.button + ' ' + style.buttonLighter}>
                    {isCreate ? "Create role" : "Update role"}
                </MyTransparentButton>
            </div>

        </form>
    );
}

export default CommunityRoleForm;