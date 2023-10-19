import style from "./TextBlockWithInput.module.css";
import DarkTransparentBackground from "../blocks/DarkTransparentBackground";
import {useState} from "react";
import EditSvg from "../../svg/EditSvg";
import MyTransparentButton from "../buttons/MyTransparentButton";
import MyDarkTextArea from "./MyDarkTextArea";
import {useClasses} from "../../../hooks/useClasses";

function TextBlockWithInput({text, ifNullText, isEdit, onAcceptCallback, textAreaProps, contentClass, ...props}) { //onAcceptCallback must return boolean value

    const [isEditForm, setIsEditForm] = useState(false)
    const [value, setValue] = useState(text)

    const classes = useClasses(style.content, contentClass)

    return (
        <div {...props}>
            { isEditForm
                ? <div className={style.classAreaDiv}>
                        <MyDarkTextArea
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            {...textAreaProps}
                        />

                        <MyTransparentButton
                            className={style.acceptBtn}
                            onClick={() => {
                                if (text !== value) {
                                    onAcceptCallback(value)
                                        .then(bool => {
                                            if (bool)
                                                setIsEditForm(false)
                                        })
                                }
                                else {
                                    setIsEditForm(false)
                                }
                            }}
                        >
                            ✓
                        </MyTransparentButton>
                    </div>


                : <DarkTransparentBackground className={classes}>
                    { value ?? <span className={style.ifNullText}> {ifNullText} </span> }

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

        </div>
    );
}

export default TextBlockWithInput;