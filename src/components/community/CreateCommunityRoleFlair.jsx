import React, {useState} from 'react';
import style from "./CreateCommunityRoleFlair.module.css";
import colorsStyle from "../../pages/userSettings/Account/Colors.module.css";
import {SketchPicker} from 'react-color';
import CommunityRoleFlair from "./CommunityRoleFlair";
import BorderBottomDiv from "../UI/blocks/BorderBottomDiv";
import MyInputOld from "../UI/inputs/MyInputOld";
import ColorElement from "../../pages/userSettings/Account/ColorElement";

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
    <div className={style.main}>

        <BorderBottomDiv className={style.flairDiv}>
            <CommunityRoleFlair
                title={flair.title}
                color={color}
                textColor={flair.textColor}
            />
        </BorderBottomDiv>


        <BorderBottomDiv className={style.settingsDiv}>
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
                    <MyInputOld
                        className={style.input}
                        placeholder="title.."
                        onChange={e => setFlair(({...flair, title: e.target.value}))}
                        maxLength="12"
                    />
                </div>
            </div>
        </BorderBottomDiv>

    </div>
    );
}

export default CreateCommunityRoleFlair;