import style from "./TextBlockWithInput.module.css";
import DarkTransparentBackground from "../blocks/DarkTransparentBackground";
import {useState} from "react";
import EditSvg from "../../svg/EditSvg";
import MyTransparentButton from "../buttons/MyTransparentButton";
import MyDarkTextArea from "./MyDarkTextArea";
import {useClasses} from "../../../hooks/useClasses";

function TextBlockWithInput({text, isEdit, onAcceptCallback, textAreaProps, contentClass, ...props}) {

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
                                onAcceptCallback(value)
                                setIsEditForm(false)
                            }}
                        >
                            ✓
                        </MyTransparentButton>
                    </div>


                : <DarkTransparentBackground className={classes}>
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

        </div>
    );
}

export default TextBlockWithInput;