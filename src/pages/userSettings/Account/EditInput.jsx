import React, {useEffect, useState} from 'react';
import style from "./Account.module.css";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import edit from "../../../images/icons/edit.svg";
import MyInputOld from "../../../components/UI/inputs/MyInputOld";

function EditInput(props) {


    const [isInput, setIsInput] = useState(false)

    const [value, setValue] = useState({
        name: props.name,
        value: ''
    })

    useEffect(() => {
        cancel()
    }, [props.current])

    function accept(e) {
        e.preventDefault()
        if (value.value !== props.current) {
            props.callback(value)
        }

        setIsInput(false)
    }

    function cancel() {

        setIsInput(false)
        setValue({...value, value: props.current})
    }

    return (
        <div className={style.block}>
            <div className={style.title}>
                {props.children}
            </div>

                <div className={style.afterTitle}>
                {isInput
                    ?
                    <div className={style.inputDiv}>
                        <div>
                            <MyTransparentButton className={style.cancel} onClick={cancel} tooltip="Cancel">
                                ✗
                            </MyTransparentButton>
                        </div>
                        <form onSubmit={accept} className={style.inputDiv}>


                            <div>
                                <MyInputOld
                                    placeholder="new value..."
                                    className={style.input}
                                    onChange={event => setValue({...value, value: event.target.value})}
                                    value={value.value}
                                    type="text"
                                    required={props.required}
                                    maxLength={props.maxLength}
                                />
                            </div>
                            <div>
                                <MyTransparentButton className={style.cancel + ' ' + style.accept} tooltip="Accept">
                                    ✓
                                </MyTransparentButton>
                            </div>
                        </form>
                    </div>

                    : <div>
                        <MyTransparentButton className={style.edit} tooltip="Edit" onClick={() => setIsInput(true)}>
                            <img src={edit} alt="edit"/>
                        </MyTransparentButton>
                        {props.current}
                    </div>
                }
                </div>

        </div>
    );
}

export default EditInput;