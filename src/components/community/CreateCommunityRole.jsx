import React, {useEffect, useState} from 'react';
import style from "./CreateCommunityRole.module.css";
import { SketchPicker } from 'react-color';
import CommunityRoleFlair from "./CommunityRoleFlair";
import BorderBottomDiv from "../UI/blocks/BorderBottomDiv";

function CreateCommunityRole({}) {

    const [color, setColor] = useState()
    function changeColor(color) {
        setColor(color.hex)
    }


    const [flair, setFlair] = useState({
        color: '',
        textColor: '',
        title: 'citizen' //max 13
    })
    function changeColorComplete(color) {
        setFlair({...flair, color: color.hex})
    }

    return (
        <div className={style.main}>

            <BorderBottomDiv className={style.flairDiv}>
                <CommunityRoleFlair
                    title={flair.title}
                    color={flair.color}
                    textColor={flair.textColor}
                />
            </BorderBottomDiv>



            <div className={style.colorPickerDiv}>
                <div className={style.title}>
                    Color of rank flair
                </div>
                <SketchPicker
                    className={style.colorPicker}
                    onChange={changeColor}
                    onChangeComplete={changeColorComplete}
                    color={color}
                />
            </div>

        </div>
    );
}

export default CreateCommunityRole;