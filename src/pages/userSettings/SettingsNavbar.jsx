import React, {useState} from 'react';
import style from './SettingsNavBar.module.css';

function SettingsNavbar({callback}) {

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
                    <div>Account</div>
                    <span>Name, nickname, image</span>
                </li>

                <li className={visitedStyle(2)} onClick={() => changeVisited(2)}>
                    <div>About me</div>
                    <span>Info displayed on page</span>
                </li>

                <li className={visitedStyle(3)} onClick={() => changeVisited(3)}>
                    <div>Security</div>
                    <span>Password, e-mail</span>
                </li>
            </ul>
        </div>
    );
}

export default SettingsNavbar;