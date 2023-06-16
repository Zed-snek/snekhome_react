import React, {useEffect, useState} from 'react';
import style from './SecurityPage.module.css'
import InfoDiv from "../../../components/UI/blocks/InfoDiv";
import MyInput from "../../../components/UI/inputs/MyInput";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import MyButton from "../../../components/UI/buttons/MyButton";
import {useFetching} from "../../../hooks/useFetching";
import MyMessage from "../../../components/UI/message/MyMessage";
import AuthService from "../../../API/AuthService";
import {useLogout} from "../../../hooks/useLogout";

function SecurityPage({loader, currentEmail}) {

    const logout = useLogout()

    /*Change password code: */
    const [pass, setPass] = useState({
        oldPass: '',
        newPass: ''
    })

    function changePassword(e) {
        e.preventDefault()

        if (pass.oldPass === pass.newPass)
            setPassMessage('Passwords are the same')
        else {
            setPassMessage('')
            fetchPass()
        }

    }

    const [fetchPass, isPassLoading, passError] = useFetching(async () => {
        await AuthService.changePassword(pass)
        logout()
    })

    const [passMessage, setPassMessage] = useState('')
    useEffect(() => {
        setPassMessage(passError)
    }, [passError])


    /*Change email code: */
    const [email, setEmail] = useState('')
    const [emailMessage, setEmailMessage] = useState('')

    const [fetchEmail, isEmailLoading, emailError] = useFetching(async () => {
        await AuthService.changeEmail(email)
        setEmailMessage('Mail is sent to your current e-mail address, please confirm action')
    })

    function changeEmail(e) {
        e.preventDefault()
        if (email === currentEmail)
            setEmailMessage('Provided e-mail is the same as old one')
        else {
            setEmailMessage('')
            fetchEmail()
        }
    }

    useEffect(() => {
        setEmailMessage(emailError)
    }, [emailError])

    useEffect(() => {
        loader(isPassLoading || isEmailLoading)
    }, [isPassLoading, isEmailLoading])


    return (
        <InfoDiv className={style.main}>

            <BorderBottomDiv>

                <form className={style.changePassDiv} onSubmit={changePassword}>

                    <h4>Change password</h4>
                    { passMessage ?
                        <MyMessage>{passMessage}</MyMessage>
                        : <></>
                    }
                    <div>
                        <label htmlFor="oldPass">Your old password:</label>
                        <MyInput
                            type="password"
                            id="oldPass"
                            placeholder="old password..."
                            onChange={event => setPass({...pass, oldPass: event.target.value})}
                            required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPass">Your new password:</label>
                        <MyInput
                            type="password"
                            id="newPass"
                            placeholder="new password..."
                            maxLength={256}
                            onChange={event => setPass({...pass, newPass: event.target.value})}
                            required={true}
                        />
                    </div>

                    <div className={style.btnDiv}>
                        <MyButton>Change</MyButton>
                    </div>

                </form>
            </BorderBottomDiv>

            {/*Email change: */}
            <br/>
            <form className={style.changePassDiv} onSubmit={changeEmail}>
                <h4>Change e-mail address</h4>
                { emailMessage ?
                    <MyMessage>{emailMessage}</MyMessage>
                    : <></>
                }
                <div className={style.currentEmailDiv}>
                    <span className={style.currentEmailTitle}>
                        Your current email:
                    </span>
                    {currentEmail}
                </div>

                <div>
                    <label htmlFor="newEmail">Your new email address:</label>
                    <MyInput
                        type="email"
                        id="newEmail"
                        placeholder="new email..."
                        onChange={event => setEmail(event.target.value)}
                        required={true}
                    />
                </div>
                <div className={style.btnDiv}>
                    <MyButton>Change</MyButton>
                </div>
            </form>

        </InfoDiv>
    );
}

export default SecurityPage;