import React, {useState} from 'react';
import style from "./CreateCommunityRoleFlair.module.css";
import colorsStyle from "../../pages/userSettings/Account/Colors.module.css";
import {SketchPicker} from 'react-color';
import CommunityRoleFlair from "./CommunityRoleFlair";
import ColorElement from "../../pages/userSettings/Account/ColorElement";
import MyInput from "../UI/inputs/MyInput";

function CreateCommunityRoleFlair({flair, setFlair}) {

    const [color, setColor] = useState(flair.bannerColor)
    function changeColor(color) {
        setColor(color.hex)
    }

    function changeColorComplete(color) {
        setFlair({...flair, bannerColor: color.hex})
    }
    function setChosenColorOfText(id) {
        setFlair({...flair, textColor: id})
    }


    return (
    <div className={style.settingsDiv}>
        <div>
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

        <div className={style.rightDiv}>
            <div>
                <div className={style.title}>
                    Color of text
                </div>
                <div className={style.textColorsDiv}>
                    <ColorElement
                        id='#E3E3E3'
                        chosen={flair.textColor}
                        setChosen={setChosenColorOfText}
                        color={colorsStyle.white}
                        active={colorsStyle.whiteActive}
                    />
                    <ColorElement
                        id='black'
                        chosen={flair.textColor}
                        setChosen={setChosenColorOfText}
                        color={colorsStyle.black}
                        active={colorsStyle.blackActive}
                    />
                </div>
            </div>
            <div>
                <div className={style.title}>
                    Title of flair
                </div>
                <MyInput
                    className={style.input}
                    placeholder="title.."
                    value={flair.title}
                    onChange={e => setFlair(({...flair, title: e.target.value}))}
                    required={true}
                    maxLength="12"
                />
            </div>
            <div>
                <div className={style.title}>
                    Result
                </div>
                <CommunityRoleFlair
                    title={flair.title}
                    color={color}
                    textColor={flair.textColor}
                />
            </div>
        </div>
    </div>
    );
}

export default CreateCommunityRoleFlair;