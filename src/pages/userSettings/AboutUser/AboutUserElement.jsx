import {useEffect, useState} from 'react';
import style from './AboutUser.module.css';
import MyTextArea from "../../../components/UI/inputs/MyTextArea";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import InfoTag from "../../userPage/InfoTag";
import MyInput from "../../../components/UI/inputs/MyInput";
import EditSvg from "../../../components/svg/EditSvg";

function AboutUserElement(props) {

    const [tag, setTag] = useState('')
    const [text, setText] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (props.tagText) {
            setTag(props.tagTitle)
            setText(props.tagText)
        }
    }, [])


    useEffect(() => {
        if (props.isForm)
            setIsEdit(true)
    }, [props.isForm])

    function manageTag(e) {
        e.preventDefault()
        props.manageData(tag, text, props.tagId)
        hideEdit()
    }

    function hideEdit() {
        if (props.isForm)
            props.setIsForm(false)
        else
            setIsEdit(false)
    }


    return (
        <div className={style.inputComponentMain}>
            { isEdit
                ? <form onSubmit={manageTag} className={style.inputForm}>
                    <div className={style.inputDiv}>
                        <div>
                            <MyInput
                                placeholder="title"
                                onChange={event => setTag(event.target.value)}
                                value={tag}
                                maxLength={50}
                                required={true}
                            />

                            <div>
                                The title is required and must not exceed 50 characters
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <MyTransparentButton>
                                Accept
                            </MyTransparentButton>

                            <MyTransparentButton type="button" onClick={hideEdit}>
                                Cancel
                            </MyTransparentButton>
                        </div>
                    </div>

                    <div>
                        <MyTextArea
                            className={style.textArea}
                            placeholder="write here some text..."
                            cols="45"
                            required
                            onChange={event => setText(event.target.value)}
                            value={text}
                            maxLength={1024}
                        />
                    </div>
                </form>

                : <div className={style.element}>
                    <div>
                        <MyTransparentButton
                            className={style.edit}
                            onClick={() => setIsEdit(true)}
                            tooltip="Edit"
                        >
                            <EditSvg />
                        </MyTransparentButton>
                    </div>

                    <div className={style.infoTag}>
                        <InfoTag
                            title={props.tagTitle}
                            text={props.tagText}
                        />
                    </div>

                    <div>
                        <MyTransparentButton
                            className={style.cancel}
                            onClick={() => props.setDelId(props.tagId)}
                            tooltip="Delete"
                        >
                            ✗
                        </MyTransparentButton>
                    </div>

                </div>
            }

        </div>
    );
}

export default AboutUserElement;