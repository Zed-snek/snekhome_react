import React, {useContext, useEffect, useState} from 'react';
import ColorElement from "./ColorElement";
import style from "./Colors.module.css";
import {UserContext} from "../../../components/context";
import MyButton from "../../../components/UI/buttons/MyButton";

function Colors({setIsShow, updateUser}) {

    const {userNickname, nicknameColor} = useContext(UserContext)

    const colors = [
        { id: 0, color: style.white, active: style.whiteActive, code: '#E3E3E3' },
        { id: 1, color: style.grey, active: style.greyActive, code: '#939393' },
        { id: 2, color: style.red, active: style.redActive, code: '#e9105e' },
        { id: 3, color: style.blue, active: style.blueActive, code: '#2c57a5' },
        { id: 4, color: style.orange, active: style.orangeActive, code: '#ff9900' },
        { id: 5, color: style.green, active: style.greenActive, code: '#85B50E' },
        { id: 6, color: style.purple, active: style.purpleActive, code: '#ff00de' }
    ]

    const [chosen, setChosen] = useState(0)

    useEffect( () => {
         setChosen( colors.find(c => c.code === nicknameColor).id )
    }, [])


    function handleClick() {
        setIsShow(false)
        updateUser({ name: 'nicknameColor', value: colors[chosen].code })
    }

    return (
        <div>
            <div className={style.nickname} style={{color: colors[chosen].code}}>
                {userNickname}
            </div>

            <div className={style.colorSet}>
            { colors.map( c =>
                <ColorElement
                    color={c.color}
                    active={c.active}
                    id={c.id}
                    chosen={chosen}
                    setChosen={setChosen}
                    key={c.id}
                />
            )}
            </div>

                <MyButton
                    className={style.btn}
                    onClick={handleClick}
                >
                    Accept
                </MyButton>

        </div>
    );
}

export default Colors;