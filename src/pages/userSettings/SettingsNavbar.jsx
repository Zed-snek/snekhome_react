import React, {useState} from 'react';
import style from './Settings.module.css'

function SettingsNavbar(props) {

    const [visited, setVisited] = useState({
        1: style.liVisited,
        2: '',
        3: ''
    })

    function changeVisited(number) {
        let empty = {
            1: '',
            2: '',
            3: ''
        }
        props.callback(number)
        empty[number] = style.liVisited
        setVisited(empty)
    }


    return (
        <div className={style.navbar}>
            <ul>
                <li className={visited[1]} onClick={() => changeVisited(1)}>
                    <div>Account</div>
                    <span>Name, nickname, image</span>
                </li>

                <li className={visited[2]} onClick={() => changeVisited(2)}>
                    <div>About me</div>
                    <span>Info displayed on page</span>
                </li>

                <li className={visited[3]} onClick={() => changeVisited(3)}>
                    <div>Security</div>
                    <span>Password, e-mail</span>
                </li>
            </ul>
        </div>
    );
}

export default SettingsNavbar;