import {UserContext} from "../components/context";
import {useContext} from "react";

export function useIsCurrentUser(nicknameToCheck) {
    const {userNickname} = useContext(UserContext)

    return userNickname.toLowerCase() === nicknameToCheck.toLowerCase()
}