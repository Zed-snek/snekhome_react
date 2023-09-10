import {useState} from 'react';
import style from "../userSettings/SettingsNavBar.module.css";

function CommunitySettingsNavbar({callback, currentUserRole, communityType}) {

    const [visited, setVisited] = useState(1)

    function changeVisited(number) {
        callback(number)
        setVisited(number)
    }

    function visitedStyle(number) {
        return number === visited ? style.liVisited : ""
    }

    return (
        <div className={style.navbar}>
            <ul>
                <li className={visitedStyle(1)} onClick={() => changeVisited(1)}>
                    <div>Details</div>
                    <span>Image, name, description</span>
                </li>

                { currentUserRole.creator && communityType !== 'ANARCHY' ?
                    <>
                        <li className={visitedStyle(2)} onClick={() => changeVisited(2)}>
                            <div>Role manager</div>
                            <span>Create, edit roles</span>
                        </li>
                        <li className={visitedStyle(4)} onClick={() => changeVisited(4)}>
                            <div>Rules</div>
                            <span>Is closed, is anonymous</span>
                        </li>

                    </>
                : <></> }

                { currentUserRole.banUser && communityType !== 'ANARCHY' ?
                    <>
                        <li className={visitedStyle(3)} onClick={() => changeVisited(3)}>
                            <div>Users</div>
                            <span>{currentUserRole.creator ? "Grant roles, ban users" : "Ban users"}</span>
                        </li>
                        <li className={visitedStyle(6)} onClick={() => changeVisited(6)}>
                            <div>Banned Users</div>
                            <span>Unban users</span>
                        </li>
                    </>
                : <></> }

                { currentUserRole.creator && communityType === 'DEMOCRACY' ?
                        <li className={visitedStyle(5)} onClick={() => changeVisited(5)}>
                            <div>Democracy</div>
                            <span>Change democracy rules</span>
                        </li>
                : <></> }
            </ul>
        </div>
    );
}

export default CommunitySettingsNavbar;