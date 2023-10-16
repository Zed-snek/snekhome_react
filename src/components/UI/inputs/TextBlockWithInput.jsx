import style from "./TextBlockWithInput.module.css";
import DarkTransparentBackground from "../blocks/DarkTransparentBackground";
import OutlineFilledDiv from "../blocks/OutlineFilledDiv";
import MyTextArea from "./MyTextArea";
import {useState} from "react";
import EditSvg from "../../svg/EditSvg";
import MyTransparentButton from "../buttons/MyTransparentButton";

function TextBlockWithInput({text, className, isEdit, onAcceptCallback}) {

    const [isEditForm, setIsEditForm] = useState(false)
    const [value, setValue] = useState(text)

    return (
        <OutlineFilledDiv className={className}>
            { isEditForm
                ? <div className={style.classAreaDiv}>
                    <MyTextArea
                        className={style.textarea}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <MyTransparentButton
                        className={style.acceptBtn}
                        onClick={() => {
                            onAcceptCallback(value)
                            setIsEditForm(false)
                        }}
                    >
                        ✓
                    </MyTransparentButton>
                </div>

                : <DarkTransparentBackground className={style.content}>
                    {value}

                    { isEdit ?
                        <div>
                            <MyTransparentButton
                                className={style.editBtn}
                                onClick={() => setIsEditForm(true)}
                            >
                                <EditSvg />
                            </MyTransparentButton>
                        </div>
                    : <></> }
                </DarkTransparentBackground>
            }

        </OutlineFilledDiv>
    );
}

export default TextBlockWithInput;