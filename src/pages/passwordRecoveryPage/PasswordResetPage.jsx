import style from './PasswordResetPage.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {useEffect, useState} from "react";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import MyMessage from "../../components/UI/message/MyMessage";
import MyInput from "../../components/UI/inputs/MyInput";
import {useDocumentTitle} from "usehooks-ts";
import MyButton from "../../components/UI/buttons/MyButton";
import {useSetStateOnReact} from "../../hooks/useLoadingAndError";

function PasswordResetPage() {

    const path = useParams()
    const navigate = useNavigate()
    useDocumentTitle("Password reset")

    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        pass: '',
        pass2: ''
    })

    const [fetchVerify, isVerifyLoading, verifyError] = useFetching(async () => {
        setMessage('')
        await AuthService.manageConfirmation(path.token)
    })

    const [fetchReset, isResetLoading, resetError] = useFetching(async () => {
        await AuthService.resetPassword(path.token, data.pass)
        navigate("/message/reset_password")
    })
    useSetStateOnReact(resetError, setMessage)

    useEffect(() => {
        fetchVerify()
    }, [])

    function resetPassword() {
        if (!data.pass || !data.pass2)
            setMessage("Both passwords must be provided")
        else if (data.pass !== data.pass2)
            setMessage("Passwords don't match")
        else
            fetchReset()
    }

    return (
        <div className={style.main}>
            <div className={style.content}>
                { verifyError
                    ? <MyMessage>{verifyError}</MyMessage>
                    : <>
                        <h3 className={style.title}> Password reset </h3>

                        <MyMessage>{message}</MyMessage>
                        <MySyncLoader loading={isVerifyLoading || isResetLoading} />

                        <div>
                            <div className={style.labelDiv}>
                                <label htmlFor="pass" className={style.label}>
                                    New password:
                                </label>

                                <div className={style.valueLength}>
                                    {data.pass.length}/256
                                </div>
                            </div>

                            <MyInput
                                type="password" placeholder="new password..." id="pass"
                                onChange={e => setData(prev => ({...prev, pass: e.target.value}))}
                                maxLength={256}
                            />
                        </div>

                        <div>
                            <div className={style.labelDiv}>
                                <label htmlFor="pass2" className={style.label}>
                                    Confirm password:
                                </label>

                                <div className={style.valueLength}>
                                    {data.pass2.length}/256
                                </div>
                            </div>

                            <MyInput
                                type="password" placeholder="confirm password..." id="pass2"
                                onChange={e => setData(prev => ({...prev, pass2: e.target.value}))}
                                maxLength={256}
                            />
                        </div>


                        <MyButton onClick={() => resetPassword()}>
                            Reset
                        </MyButton>
                    </>
                }
            </div>
        </div>
    );
}

export default PasswordResetPage;