import React, {useEffect, useState} from 'react';
import style from './AboutUser.module.css';
import MyInputOld from "../../../components/UI/inputs/MyInputOld";
import MyTextArea from "../../../components/UI/inputs/MyTextArea";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import InfoTag from "../../userPage/InfoTag";
import edit from "../../../images/edit.svg";

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
        if (props.isForm) {
            setIsEdit(true)
        }
    }, [props.isForm])

    function manageTag(e) {
        e.preventDefault()
        props.manageData(tag, text, props.tagId)
        hideEdit()
    }

    function hideEdit() {
        if (props.isForm) {
            props.setIsForm(false)
        }
        else {
            setIsEdit(false)
        }
    }


    return (
        <div className={style.inputComponentMain}>
            { isEdit
                ?

                <form onSubmit={manageTag} className="flexDiv flex-wrap justify-content-center">
                    <div className={style.inputDiv}>

                        <div>
                            <MyInputOld
                                placeholder="title"
                                onChange={event => setTag(event.target.value)}
                                value={tag}
                                maxLength={50}
                                required={true}
                            />
                        </div>

                        <div>
                            The title is required and must not exceed 50 characters
                        </div>

                        <div className={style.buttons + " flexDiv flex-wrap"}>
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
                            placeholder="write here some text..."
                            rows="4" cols="45"
                            required
                            onChange={event => setText(event.target.value)}
                            value={text}
                            maxLength={1024}
                        >
                        </MyTextArea>
                    </div>

                </form>


                : <div className="flexDiv flex-wrap">
                    <div>
                        <MyTransparentButton className={style.edit} onClick={() => setIsEdit(true)} tooltip="Edit">
                            <img src={edit} alt="edit"/>
                        </MyTransparentButton>
                    </div>

                    <InfoTag
                        title={props.tagTitle}
                        text={props.tagText}
                    />

                    <div>
                        <MyTransparentButton className={style.cancel} onClick={() => props.setDelId(props.tagId)} tooltip="Delete">
                            ✗
                        </MyTransparentButton>
                    </div>


                </div>

            }

        </div>
    );
}

export default AboutUserElement;