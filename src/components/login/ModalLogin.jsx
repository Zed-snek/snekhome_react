import Modal from 'react-bootstrap/Modal';
import style from "./ModalLogin.module.css";
import MyButton from "../UI/buttons/MyButton";
import MyInput from "../UI/inputs/MyInput";
import MyTextLink from "../UI/links/MyTextLink";
import MyMessage from "../UI/message/MyMessage";
import TransparentModal from "../UI/modal/TransparentModal";
import {useState} from "react";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../UI/loaders/MySyncLoader";
import {useSetStateOnReact} from "../../hooks/useLoadingAndError";
import AuthService from "../../API/AuthService";

//logic about Send Reset Password Email request
function ModalLogin({visible, setVisible, loginFunction, userData, setUserData, message, setMessage, isLoading}) {

    const [isResetPasswordForm, setIsResetPasswordForm] = useState(false)

    const [sendResetPasswordMail, isResetPasswordMailLoading, resetPasswordError] = useFetching(async () => {
        await AuthService.sendResetPasswordEmail(userData.login)
        setIsResetPasswordForm(false)
        setMessage("Reset password link is sent to your e-mail")
    })

    useSetStateOnReact(resetPasswordError, setMessage)

    function onSubmit(event) {
        event.preventDefault()
        if (isResetPasswordForm) {
            if (userData.login !== '') {
                sendResetPasswordMail()
            }
        }
        else if (userData.login !== '' && userData.password !== '') {
            loginFunction()
        }
    }

    return (
        <TransparentModal
            visible={visible}
            setVisible={setVisible}
        >
            <Modal.Header className={style.header}>
                <h4>
                    { isResetPasswordForm
                        ? "Enter e-mail to reset password"
                        : "Login"
                    }
                </h4>

                <MySyncLoader
                    loading={isLoading || isResetPasswordMailLoading}
                    size={10}
                />
            </Modal.Header>

            <Modal.Body>
                <MyMessage>
                    {message}
                </MyMessage>

                <form onSubmit={onSubmit}>
                    <label htmlFor="email">
                        Your e-mail address:
                    </label>

                    <MyInput
                        type="email" id="email" placeholder="e-mail" name="email"
                        onChange={e => setUserData(prev => ({...prev, login: e.target.value}))}
                    />

                    { isResetPasswordForm
                        ? <></>
                        : <>
                            <label htmlFor="password">
                                Your password:
                            </label>

                            <MyInput
                                type="password" id="password" placeholder="password" name="password"
                                onChange={e => setUserData(prev => ({...prev, password: e.target.value}))}
                                required={true}
                            />
                        </>
                    }

                    <div className={style.loginButtonDiv}>
                        { isResetPasswordForm
                            ? <div>
                                <MyTextLink isLink={false} onClick={() => setIsResetPasswordForm(false)} >
                                    Back to login
                                </MyTextLink>
                            </div>
                            : <div>
                                <div className={style.link}>
                                    <span className={style.textAboveLink}>
                                        Don't have an account?
                                    </span>

                                    <MyTextLink to="/register" onClick={() => setVisible(false)}>
                                        Register
                                    </MyTextLink>
                                </div>

                                <div className={style.link}>
                                    <span className={style.textAboveLink}>
                                        Forgot password?
                                    </span>

                                    <MyTextLink isLink={false} onClick={() => setIsResetPasswordForm(true)} >
                                        Reset
                                    </MyTextLink>
                                </div>
                            </div>
                        }

                        <div>
                            <MyButton>
                                { isResetPasswordForm
                                    ? "Continue"
                                    : "Login"
                                }
                            </MyButton>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </TransparentModal>
    );
}

export default ModalLogin;