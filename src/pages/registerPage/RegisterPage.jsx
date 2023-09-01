import React, {useEffect, useState} from 'react';
import style from "./RegisterPage.module.css"
import MyInput from "../../components/UI/inputs/MyInput";
import MyButton from "../../components/UI/buttons/MyButton";
import {useForm} from "react-hook-form";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import MyMessage from "../../components/UI/message/MyMessage";
import MessageModal from "../../components/UI/modal/MessageModal";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import {isNotBannedSymbols} from "../../functions/stringFunctions";
import {useDocumentTitle} from "usehooks-ts";
import BooleanBlock from "../../components/structureComponents/BooleanBlock";


function RegisterPage() {

    useDocumentTitle("Registration")

    const [userData, setUserData] = useState({
        email: '',
        password: ''
        }
    )
    const [errorMessage, setErrorMessage] = useState('')
    const [messageModal, setMessageModalVisible] = useState(false)

    const [fetchRegister, isRegisterLoading, registerError] = useFetching(async () => {
        await AuthService.registerUser(userData)
        setMessageModalVisible(true)
    })

    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: '',
            surname: '',
            nickname: '',
            email: '',
            password: ''
        }
    });

    useEffect( () => {
        if (userData.email !== '' && userData.password !== '')
            fetchRegister()
    }, [userData])


    useEffect( () => {
        setErrorMessage(registerError)
    }, [registerError])


    function sendData(formValues){
        if (isNotBannedSymbols(formValues.nickname))
            setUserData(formValues)
        else
            setErrorMessage("Nickname must contain only allowed symbols: a-z, A-Z, 0-9, -, _")
    }


    return (
        <div className={style.content}>

            <MessageModal
                visible={messageModal}
                setVisible={setMessageModalVisible}
                navigate={"/posts"}
            >
                Verification mail is sent on your email. Verify it, please
            </MessageModal>

            <div className={style.title}>
                <h2>Registration</h2>
                <MySyncLoader loading={isRegisterLoading} />

                <BooleanBlock bool={!isRegisterLoading}>
                    <MyMessage>
                        {errorMessage}
                    </MyMessage>
                </BooleanBlock>

            </div>

            <form onSubmit={handleSubmit(sendData)}>

                <div className={style.inputsDiv}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div>
                            <label htmlFor="name">Your name:</label>
                            <MyInput
                                type="text" id="name" placeholder="name"
                                register={register} name="name"
                                maxLength={18}
                            />
                        </div>

                        <div>
                            <label htmlFor="surname">Your surname:</label>
                            <MyInput
                                type="text" id="surname" placeholder="surname"
                                maxLength={20}
                                register={register} name="surname"
                            />
                        </div>

                        <div>
                            <label htmlFor="nickname">Your nickname:</label>
                            <MyInput
                                type="text" id="nickname" placeholder="nickname"
                                maxLength={18}
                                register={register} name="nickname"
                                required={true}
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Your e-mail address:</label>
                            <MyInput
                                type="email" id="email" placeholder="e-mail"
                                register={register} name="email"

                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Your password:</label>
                        <MyInput
                            type="password" id="password" placeholder="password"
                            maxLength={256}
                            register={register} name="password"
                            required={true}
                        />
                    </div>
                </div>

                <MyButton color={'blue'} width={'30%'}>
                    Register
                </MyButton>
            </form>
        </div>
    );
}

export default RegisterPage;