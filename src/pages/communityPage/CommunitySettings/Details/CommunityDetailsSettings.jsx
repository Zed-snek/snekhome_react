import React, {useEffect, useState} from 'react';
import style from "./CommunityDetailsSettings.module.css";
import EditInput from "../../../userSettings/Account/EditInput";
import {useFetching} from "../../../../hooks/useFetching";
import CommunityService from "../../../../API/CommunityService";
import {isObjectNotEmpty} from "../../../../functions/objectFunctions";

function CommunityDetailsSettings({groupname, name, description, setError, setIsLoader, setData}) {

    const [updateData, setUpdateData] = useState({})

    const [fetchUpdate, isUpdateLoading, updateError] = useFetching(async () => {
        await CommunityService.updateCommunityDetails({...updateData, oldGroupname: groupname})
        if (updateData.name)
            setData(prev => ({...prev, community: {...prev.community, name: updateData.name}}))
        else if (updateData.groupname)
            setData(prev => ({...prev, community: {...prev.community, groupname: updateData.groupname}}))
        else if (updateData.description)
            setData(prev => ({...prev, community: {...prev.community, description: updateData.description}}))
    })

    function updateValue(newValue) {
        setUpdateData( ({[newValue.name]: newValue.value}) )
    }
    useEffect(() => {
        if (isObjectNotEmpty(updateData))
            fetchUpdate()
    }, [updateData])

    useEffect(() => {
        if (updateError)
            setError(updateError)
    }, [updateError])
    useEffect(() => {
        setIsLoader(isUpdateLoading)
    }, [isUpdateLoading])

    return (
        <div>
            <EditInput
                current={name}
                name="name"
                maxLength={25}
                callback={updateValue}
            >
                name:
            </EditInput>
            <EditInput
                current={groupname}
                name="groupname"
                maxLength={18}
                callback={updateValue}
            >
                groupname:
            </EditInput>
            <EditInput
                className={style.textArea}
                current={description}
                name="description"
                maxLength={512}
                isTextArea={true}
                callback={updateValue}
            >
                description:
            </EditInput>
        </div>
    );
}

export default CommunityDetailsSettings;