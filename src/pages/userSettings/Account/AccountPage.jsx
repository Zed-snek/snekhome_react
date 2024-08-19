import {useContext, useEffect, useState} from 'react';
import InfoDiv from "../../../components/UI/blocks/InfoDiv";
import style from "./Account.module.css";
import {UserContext} from "../../../components/context";
import EditInput from "./EditInput";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import {isNotBannedSymbols} from "../../../utils/stringFunctions"
import MyFileInput from "../../../components/UI/inputs/MyFileInput";
import OverImageDiv from "../../../components/UI/blocks/OverImageDiv";
import FadingMessage from "../../../components/UI/message/FadingMessage";
import {getUserImage} from "../../../utils/linkFunctions";
import MyButton from "../../../components/UI/buttons/MyButton";
import OverContentDiv from "../../../components/UI/blocks/OverContentDiv";
import Colors from "./Colors";
import {isObjectNotEmpty} from "../../../utils/objectFunctions";
import myButtonStyle from "../../../components/UI/buttons/MyTransparentButton.module.css";
import EditSvg from "../../../components/svg/EditSvg";


function AccountPage(props) {

    const {userImage, setUserImage, userNickname, setUserNickname, setNicknameColor} = useContext(UserContext)

    const [updatedUser, setUpdatedUser] = useState({})

    function updateValue(newValue) {
        setUpdatedUser(({[newValue.name]: newValue.value}))
    }

    const [fetchUpdateUser, fetchLoading, fetchError] = useFetching(async ()=> {
        if (updatedUser.image) {
            let response = await UserService.newImage(updatedUser.image)
            setUserImage(getUserImage(response.message))
        }
        else {
            await UserService.updateUser(updatedUser)
            if (updatedUser.nickname) {
                setUserNickname(updatedUser.nickname)
                window.history.pushState({}, '','/u/' + updatedUser.nickname)
                window.history.pushState({}, '','/settings')
            }
            else if (updatedUser.nicknameColor) {
                setNicknameColor(updatedUser.nicknameColor)
            }
            else {
                let key = Object.keys(updatedUser)
                props.setUser(prev => ( {...prev, [key]:updatedUser[key]} ))
            }
        }
    })

    const [showError, setShowError] = useState(false) //file too big error

    const [isShowColorChoose, setIsShowColorChoose] = useState(false) //sets is opened block with choosing color of nickname
    function handleChooseColorWindow() {
        if (isShowColorChoose)
            setIsShowColorChoose(false)
        else
            setIsShowColorChoose(true)
    }

    useEffect(() => {
        if (isObjectNotEmpty(updatedUser)) { //checks if object updatedUser is empty
            if (updatedUser.nickname && !isNotBannedSymbols(updatedUser.nickname))
                props.setError("Nickname must contain only allowed symbols: a-z, A-Z, 0-9, -, _")
            else
                fetchUpdateUser()
        }
    }, [updatedUser])

    useEffect(() => {
        props.setLoader(fetchLoading)
    }, [fetchLoading])
    useEffect(() => {
        props.setError(fetchError)
    }, [fetchError])

    return (
        <InfoDiv>

            <div className={style.main}>

                <EditInput current={props.name} callback={updateValue} name="name" maxLength={18} isEdit={true}>
                    name:
                </EditInput>
                <EditInput current={props.surname} callback={updateValue} name="surname" maxLength={20} isEdit={true}>
                    surname:
                </EditInput>
                <EditInput current={userNickname} callback={updateValue} name="nickname" required maxLength={18} isEdit={true}>
                    nickname:
                </EditInput>

                <div className={style.changeColorDiv}>
                    <MyButton onClick={handleChooseColorWindow}>
                        Change color of nickname
                    </MyButton>
                    <OverContentDiv
                        title="Choose color of your nickname: "
                        isShow={isShowColorChoose}
                        setIsShow={setIsShowColorChoose}
                    >
                        <Colors
                            setError={props.setError}
                            setIsShow={setIsShowColorChoose}
                            setLoader={props.setLoader}
                            updateUser={updateValue}
                        />
                    </OverContentDiv>
                </div>


                <div className={style.imgDiv}>
                    <div className={style.imgBig}>
                        <OverImageDiv className={style.overImageDiv}>
                            <div className={style.overImageDivText}>User page size</div>
                            <MyFileInput
                                className={style.fileBtn + " " + myButtonStyle.main}
                                maxSize={5}
                                setIsShowError={setShowError}
                                setImage={updateValue}
                            >
                                <EditSvg />
                            </MyFileInput>
                            <FadingMessage
                                className={style.fadingMessage}
                                setIsShow={setShowError}
                                isShow={showError}
                            >
                                File is too big, <br/>
                                max size allowed 5mb
                            </FadingMessage>
                        </OverImageDiv>
                        <img src={userImage} className={style.img} alt=""/>
                    </div>

                    <div>
                        <div className={style.overImageDivText}>
                            Medium size
                        </div>
                        <img src={userImage} className={"mediumUserImage " + style.userImg} alt=""/>
                    </div>
                    <div>
                        <div className={style.overImageDivText}>
                            Smaller size
                        </div>
                        <img src={userImage} className={"userImage " + style.userImg} alt=""/>
                    </div>

                </div>

            </div>

        </InfoDiv>
    );
}

export default AccountPage;