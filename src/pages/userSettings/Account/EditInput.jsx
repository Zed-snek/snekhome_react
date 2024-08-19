import {useEffect, useState} from 'react';
import style from "./Account.module.css";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import MyInput from "../../../components/UI/inputs/MyInput";
import MyTextArea from "../../../components/UI/inputs/MyTextArea";
import EditSvg from "../../../components/svg/EditSvg";

function EditInput({isTextArea, children, current, name, callback, isEdit, ...props}) {

    const [isInput, setIsInput] = useState(false)
    useEffect(() => {
        if (isInput && value.value !== current)
            setCurrentValue()
    }, [isInput])

    const [value, setValue] = useState({
        name: name,
        value: ''
    })

    useEffect(() => {
        cancel()
    }, [current])

    function accept(e) {
        e.preventDefault()
        if (value.value !== current) {
            callback(value)
        }
        setIsInput(false)
    }

    function cancel() {
        setIsInput(false)
        setCurrentValue()
    }

    function setCurrentValue() {
        setValue({...value, value: current})
    }

    return (
        <div className={style.block}>
            <div className={style.title}>
                {children}
            </div>

            <div className={style.afterTitle}>
            { isInput
                ?
                <div className={style.inputDiv}>
                    <div>
                        <MyTransparentButton className={style.cancel} onClick={cancel} tooltip="Cancel">
                            ✗
                        </MyTransparentButton>
                    </div>
                    <form onSubmit={accept} className={style.inputDiv}>

                        <div>
                            { isTextArea
                                ? <MyTextArea
                                    onChange={event => setValue({...value, value: event.target.value})}
                                    value={value.value}
                                    {...props}
                                >
                                </MyTextArea>
                                : <MyInput
                                    placeholder="new value..."
                                    className={style.input}
                                    onChange={event => setValue({...value, value: event.target.value})}
                                    value={value.value}
                                    type="text"
                                    {...props}
                                />
                            }
                        </div>

                        <div>
                            <MyTransparentButton className={style.cancel + ' ' + style.accept} tooltip="Accept">
                                ✓
                            </MyTransparentButton>
                        </div>

                    </form>
                </div>

                : <div className={style.editBtnDiv}>
                    { isEdit ?
                        <MyTransparentButton
                            className={style.edit}
                            tooltip="Edit"
                            onClick={() => setIsInput(true)}
                        >
                            <EditSvg />
                        </MyTransparentButton>
                    : <></> }
                    <div>
                        {current}
                    </div>
                </div>
            }
            </div>

        </div>
    );
}

export default EditInput;