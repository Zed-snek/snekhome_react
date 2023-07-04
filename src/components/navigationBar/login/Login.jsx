import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../../context";
import ModalLogin from "./ModalLogin";
import {useFetching} from "../../../hooks/useFetching";
import AuthService from "../../../API/AuthService";
import {useLocation} from "react-router-dom";

function Login(props) {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [userData, setUserData] = useState({login: '', password: ''})
    const [message, setMessage] = useState('')

    const location = useLocation()

    const [fetchLogin, isLoginLoading, loginError] = useFetching(async () => {
        const data = await AuthService.loginUser(userData)
        localStorage.setItem('authToken', 'Bearer ' + data.token)
        localStorage.setItem('auth', 'true')
        props.setVisible(false)
        setIsAuth(true)

    })

    function login(login, pass) {
        setUserData({login: login, password: pass})
    }

    useEffect( () => {
        if (userData.login !== '' && userData.password !== '') {
            fetchLogin()
        }
    }, [userData])


    useEffect( () => {

        if (isAuth) {
            props.setVisible(false)
        }
        else if (loginError) {
            setMessage(loginError)
        }
        else if (location.pathname === "/message/unreachable") {
            props.setVisible(true)
            setMessage("Please, log in to continue")
        }
        else if (location.pathname === "/message/verified") {
            props.setVisible(true)
            setMessage(location.state)
        }

    }, [loginError, isAuth, location])



    return (
        <ModalLogin
            isLoading={isLoginLoading}
            message={message} /*loginError*/
            visible={props.visible}
            setVisible={props.setVisible}
            loginFunction={login}
        />

    );
}

export default Login;

