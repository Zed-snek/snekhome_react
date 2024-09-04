import {useState} from 'react';
import style from "./PostForm.module.css";
import MyMessage from "../../components/UI/message/MyMessage";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import MyTextArea from "../../components/UI/inputs/MyTextArea";
import MyFileInput from "../../components/UI/inputs/MyFileInput";
import FadingMessage from "../../components/UI/message/FadingMessage";
import ImageToOpen from "../../components/imageComponents/ImageToOpen";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import MyCheckbox from "../../components/UI/inputs/MyCheckbox";
import MyButton from "../../components/UI/buttons/MyButton";
import {useParams} from "react-router-dom";

function PostForm({
      setImages, text, setText, error, onSubmit, isSomethingLoading, srcImages, removeFileByIndex /*common*/,
    isAnonAllowed, setIsAnon, /*new post*/
    isEdit /*edit post*/
}) {

    const params = useParams()

    const [showImgError, setShowImgError] = useState(false)

    return (
        <div className={style.main}>

            {isEdit
                ? <h3>Edit post</h3>
                : <h3>New post in community <i>{params.groupname}</i></h3>
            }

            <MyMessage>
                {error}
            </MyMessage>
            <br/>

            <OutlineFilledDiv className={style.form}>
                <div className={style.titleDiv}>
                    <div className={style.title}>
                        Text:
                    </div>
                    <div className={style.subTitle}>
                        {text.length}/2048
                    </div>
                </div>
                <MyTextArea
                    className={style.textArea}
                    onChange={event => setText(event.target.value)}
                    placeholder="Type some text... (optional)"
                    value={text}
                    rows={4}
                    maxLength={2048}
                />

                <div className={style.titleDiv}>
                    <div className={style.title}>
                        Images:
                    </div>
                    <div className={style.subTitle}>
                        max. 10
                    </div>
                </div>
                <div className={style.chosenImages}>
                    <div>
                        <MyFileInput
                            maxFiles={10 - srcImages.length}
                            maxSize={10}
                            setImage={setImages}
                            setIsShowError={setShowImgError}
                        >
                            <div className={style.moreImagesBtn}>
                                +
                            </div>
                        </MyFileInput>
                    </div>
                    <div>
                        <div className={style.fadingMessageDiv}>
                            <FadingMessage
                                className={style.fadingMessage}
                                setIsShow={setShowImgError}
                                isShow={showImgError}
                            >
                                File is too big (max size allowed 10mb), <br/>
                                or too many images were chosen
                            </FadingMessage>
                        </div>
                    </div>

                    { srcImages.map((element, index) =>
                        <ImageToOpen
                            key={index}
                            maxWidth={130}
                            maxHeight={130}
                            image={element}
                            toOpenClassname={style.imageIco}
                            toRemove={() => removeFileByIndex(index)}
                        />
                    )}

                </div>

                <div className={style.btnDiv}>
                    <MySyncLoader loading={isSomethingLoading}/> {/*isPostLoading*/}

                    { isAnonAllowed ?
                        <MyCheckbox
                            label="is post anonymous"
                            onChange={event => setIsAnon(event.target.checked)}
                        />
                        : <></>
                    }

                    <MyButton onClick={onSubmit}>
                        Submit
                    </MyButton>
                </div>

            </OutlineFilledDiv>

        </div>
    );

}

export default PostForm;