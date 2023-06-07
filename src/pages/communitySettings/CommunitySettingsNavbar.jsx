import React, {useState} from 'react';
import style from "../userSettings/SettingsNavBar.module.css";

function CommunitySettingsNavbar({callback, role}) {
    const [visited, setVisited] = useState({
        1: style.liVisited,
        2: '',
        3: '',
        4: '',
        5: ''
    })

    function changeVisited(number) {
        let empty = {
            1: '',
            2: '',
            3: '',
            4: '',
            5: ''
        }
        callback(number)
        empty[number] = style.liVisited
        setVisited(empty)
    }

    return (
        <div className={style.navbar}>
            <ul>
                <li className={visited[1]} onClick={() => changeVisited(1)}>
                    <div>Details</div>
                    <span>Image, name, description</span>
                </li>

                <li className={visited[2]} onClick={() => changeVisited(2)}>
                    <div>Role manager</div>
                    <span>Create, edit roles</span>
                </li>

                <li className={visited[3]} onClick={() => changeVisited(3)}>
                    <div>Users</div>
                    <span>Grant roles, ban users</span>
                </li>

                <li className={visited[4]} onClick={() => changeVisited(4)}>
                    <div>Rules</div>
                    <span>Is closed, is anonymous</span>
                </li>

                <li className={visited[5]} onClick={() => changeVisited(5)}>
                    <div>Democracy</div>
                    <span>Change democracy rules</span>
                </li>
            </ul>
        </div>
    );
}

export default CommunitySettingsNavbar;