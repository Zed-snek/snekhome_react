import {useContext, useState} from 'react';
import style from "./UserPage.module.css";
import MyTransparentButton from "../../components/UI/buttons/MyTransparentButton";
import MessageModal from "../../components/UI/modal/MessageModal";
import {useNavigate, useParams} from "react-router-dom";
import {useLogout} from "../../hooks/useLogout";
import {UserContext} from "../../components/context";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import SettingsSvg from "../../components/svg/user/SettingsSvg";
import LogoutSvg from "../../components/svg/user/LogoutSvg";
import UserRemoveSvg from "../../components/svg/user/UserRemoveSvg";
import UserAddSvg from "../../components/svg/user/UserAddSvg";

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

    const types = [
        {title: "FRIENDS", image: <UserRemoveSvg />, tooltip: "Remove from friends"},
        {title: "NOT_FRIENDS", image: <UserAddSvg />, tooltip: "Add to friends"},
        {title: "CURRENT_FOLLOW", image: <UserRemoveSvg />, tooltip: "Remove friend request"},
        {title: "SECOND_FOLLOW", image: <UserAddSvg />, tooltip: "Accept friend request"}
    ]

    function manageFriend() {
        fetchFriend()
    }

    function content() {
        if (params.nickname.toLowerCase() === userNickname.toLowerCase()) {
            return <>
                <MyTransparentButton
                    className={style.nicknameIco}
                    tooltip="Settings Page"
                    onClick={() => navigate('/settings')}
                >
                    <SettingsSvg />
                </MyTransparentButton>
                <MyTransparentButton
                    className={style.nicknameIco}
                    tooltip="Logout"
                    onClick={() => setLogoutModal(true)}
                >
                    <LogoutSvg />
                </MyTransparentButton>
                <MessageModal
                    visible={isLogoutModal}
                    setVisible={setLogoutModal}
                    acceptCallback={logout}
                > {/*Logout Modal*/}
                    Are you sure you want to logout?
                </MessageModal>
            </>
        }
        else if (friendshipType) {
            let type = types.find(t => t.title === friendshipType)
            return (
                <MyTransparentButton
                    className={style.nicknameIco}
                    tooltip={type.tooltip}
                    onClick={manageFriend}
                >
                    {type.image}
                </MyTransparentButton>
            );
        }

    }

    return (
        <div className="noWrap">
            {content()}
        </div>
    );
}

export default UserNicknameButtons;