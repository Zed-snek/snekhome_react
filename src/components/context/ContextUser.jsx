import React, {useEffect, useState, useContext} from 'react';
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import {AuthContext, UserContext} from "./index";
import {getUserImage} from "../../utils/linkFunctions";

function ContextUser({children}) {

    const {isAuth} = useContext(AuthContext)

    const [userImage, setUserImage] = useState('')
    const [userImageName, setUserImageName] = useState('')
    const [userNickname, setUserNickname] = useState('')
    const [nicknameColor, setNicknameColor] = useState('#E3E3E3')

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const data = await UserService.navbarInfo()
        setUserImage( getUserImage(data['image']) )
        setUserImageName(data['image'])
        setUserNickname(data['nickname'])
        setNicknameColor(data['nicknameColor'])
    })

    useEffect( () => {
        if (isAuth) {
            fetchUser()
        }
        if (userError) {
            console.log(userError)
        }
    }, [isAuth])

    return (
        <UserContext.Provider value={{
            userImage,
            setUserImage,
            userImageName,
            userNickname,
            setUserNickname,
            nicknameColor,
            setNicknameColor,
            isUserLoading
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default ContextUser;