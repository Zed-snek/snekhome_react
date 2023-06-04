import React, {useContext, useState} from 'react';
import style from "./UserPage.module.css";
import MyTransparentButton from "../../components/UI/buttons/MyTransparentButton";
import settingIco from "../../images/icons/settingIco.svg";
import logoutIco from "../../images/icons/logoutIco.svg";
import MessageModal from "../../components/UI/modal/MessageModal";
import addFriendIco from "../../images/icons/userAdd.svg";
import delFriendIco from "../../images/icons/userRemove.svg";
import {useNavigate, useParams} from "react-router-dom";
import {useLogout} from "../../hooks/useLogout";
import {UserContext} from "../../components/context";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";

function UserNicknameButtons({friendshipType, setFriendshipType}) {
    const params = useParams()
    const navigate = useNavigate()
    const logout = useLogout()
    const {userNickname} = useContext(UserContext)

    const [isLogoutModal, setLogoutModal] = useState(false)

    const [fetchFriend, isFriendLoading, friendError] = useFetching(async () => {
        if (friendshipType === "NOT_FRIENDS" || friendshipType === "SECOND_FOLLOW") {
            await UserService.addFriend(params.nickname)
        }
        else if (friendshipType === "FRIENDS" || friendshipType === "CURRENT_FOLLOW") {
            await UserService.delFriend(params.nickname)
        }
        switch (friendshipType) {
            case "NOT_FRIENDS":
                setFriendshipType("CURRENT_FOLLOW")
                break
            case "SECOND_FOLLOW":
                setFriendshipType("FRIENDS")
                break
            case "FRIENDS":
                setFriendshipType("SECOND_FOLLOW")
                break
            case "CURRENT_FOLLOW":
                setFriendshipType("NOT_FRIENDS")
                break
        }
    })

    function manageFriend() {
        fetchFriend()
    }


    function content() {
        if (params.nickname.toLowerCase() === userNickname.toLowerCase()) {
            return  <>
                <MyTransparentButton
                    className={style.nicknameIco}
                    tooltip="Settings Page"
                    onClick={() => navigate('/settings')}>
                    <img src={settingIco} alt="settings"/>
                </MyTransparentButton>
                <MyTransparentButton
                    className={style.nicknameIco}
                    tooltip="Logout"
                    onClick={() => setLogoutModal(true)}>
                    <img src={logoutIco} alt="logout"/>
                </MyTransparentButton>
                <MessageModal
                    visible={isLogoutModal}
                    setVisible={setLogoutModal}
                    isAcceptButton={true}
                    acceptCallback={logout}
                > {/*Logout Modal*/}
                    Are you sure you want to logout?
                </MessageModal>
            </>
        }
        else {
            if (friendshipType === "NOT_FRIENDS") {
                return <>
                    <MyTransparentButton
                        className={style.nicknameIco}
                        tooltip="Add to friends"
                        onClick={manageFriend}
                    >
                        <img src={addFriendIco} alt="Add"/>
                    </MyTransparentButton>
                </>
            }
            else if (friendshipType === "FRIENDS") {
                return <>
                    <MyTransparentButton
                        className={style.nicknameIco}
                        tooltip="Remove from friends"
                        onClick={manageFriend}
                    >
                        <img src={delFriendIco} alt="Add"/>
                    </MyTransparentButton>
                </>
            }
            else if (friendshipType === "CURRENT_FOLLOW") {
                return <>
                    <MyTransparentButton
                        className={style.nicknameIco}
                        tooltip="Remove friend request"
                        onClick={manageFriend}
                    >
                        <img src={delFriendIco} alt="Del"/>
                    </MyTransparentButton>
                </>
            }
            else if (friendshipType === "SECOND_FOLLOW") {
                return <>
                    <MyTransparentButton
                        className={style.nicknameIco}
                        tooltip="Accept friend request"
                        onClick={manageFriend}
                    >
                        <img src={addFriendIco} alt="Add"/>
                    </MyTransparentButton>
                </>
            }

        }
    }



    return (
        <div className="noWrap">
            {content()}
        </div>
    );
}

export default UserNicknameButtons;