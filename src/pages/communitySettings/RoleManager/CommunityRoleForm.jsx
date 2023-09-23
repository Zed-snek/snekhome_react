import {useEffect, useState} from 'react';
import style from "./CommunityRoleManager.module.css";
import CreateCommunityRoleFlair from "../../../components/community/CreateCommunityRoleFlair";
import MyCheckbox from "../../../components/UI/inputs/MyCheckbox";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import MyButton from "../../../components/UI/buttons/MyButton";
import OverContentDiv from "../../../components/UI/blocks/OverContentDiv";

function CommunityRoleForm({isCreate, typesToMap, groupname, setRoles, setError, setIsLoader, roleToEdit,
                               setIsShow, isShow, formTitle}
) {

    const isCreatorOrCitizen = isCreate ? false : (roleToEdit.creator || roleToEdit.citizen)
    const [flair, setFlair] = useState(isCreate
        ? {title: 'new', textColor: '#E3E3E3', bannerColor: 'cadetblue'}
        : {title: roleToEdit.title, textColor: roleToEdit.textColor, bannerColor: roleToEdit.bannerColor}
    )

    function typeAllowedInitialState() {
        let obj = {
            editDescription: false,
            editId: false,
            deletePosts: false,
            banUser: false,
            banCitizen: false,
            inviteUsers: false
        }
        if (!isCreate)
            obj = roleToEdit
        return obj
    }

    const [typeAllowed, setTypeAllowed] = useState(typeAllowedInitialState())

    function end() {
        setIsShow(false)
        setIsLoader(false)
    }

    const [fetchRole, isFetchLoading, fetchError] = useFetching(async () => {
        let role = {...typeAllowed, ...flair}

        if (isCreate) {
            await CommunityService.newRole(role, groupname)
            setRoles(prev => [...prev, role])
        }
        else {
            await CommunityService.updateRole(role, groupname, roleToEdit.title)
            setRoles(prev => prev.map(r => r.title === roleToEdit.title ? role : r))
        }
        end()
    })

    function manageRole(e) {
        e.preventDefault()
        fetchRole()
    }

    const [fetchDelete, isDeleteLoading, deleteError] = useFetching(async () => {
        await CommunityService.deleteRole(groupname, roleToEdit.title)
        end()
        setRoles(prev => prev.filter(r => r.title !== roleToEdit.title))
    })


    function deleteRole(e) {
        e.preventDefault()
        fetchDelete()
    }

    useEffect(() => {
        setIsLoader(isFetchLoading || isDeleteLoading)
    }, [isFetchLoading, isDeleteLoading])
    useEffect(() => {
        if (fetchError)
            setError(fetchError)
        else if (deleteError)
            setError(deleteError)
    }, [fetchError, deleteError])
    
    return (
        <OverContentDiv
            className={style.formWindow}
            isShow={isShow}
            setIsShow={setIsShow}
            title={formTitle}
        >
            <form onSubmit={manageRole}>

                <div className={style.settings}>
                    <div>
                        <CreateCommunityRoleFlair flair={flair} setFlair={setFlair}/>
                    </div>

                    <div className={style.formRightDiv}>

                        <div>
                            <div className={style.title}>
                                Role permissions
                            </div>
                            {typesToMap.map((t, index) =>
                                <div key={index} className={style.checkBox}>
                                    <MyCheckbox
                                        disabled={roleToEdit ? isCreatorOrCitizen : false}
                                        label={t.value}
                                        checked={typeAllowed[t.title]}
                                        onChange={e => setTypeAllowed(prev => {
                                            let obj = {...prev}
                                            obj[t.title] = e.target.checked
                                            return obj
                                        })}
                                    />
                                </div>
                            )}
                        </div>

                        {!isCreate ?
                            <div className={style.formDeleteBtn}>
                                <MyButton
                                    color='red'
                                    onClick={deleteRole}
                                    disabled={isCreatorOrCitizen}
                                >
                                    Delete role
                                </MyButton>
                            </div>
                            : <> </>}

                    </div>

                </div>

                <div>
                    <MyTransparentButton className={style.button + ' ' + style.buttonLighter}>
                        {isCreate ? "Create role" : "Update role"}
                    </MyTransparentButton>
                </div>

            </form>
        </OverContentDiv>
    );
}

export default CommunityRoleForm;