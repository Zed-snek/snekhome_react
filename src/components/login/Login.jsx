import {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../context";
import ModalLogin from "./ModalLogin";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {useLocation} from "react-router-dom";
import {useSetStateOnReact} from "../../hooks/useLoadingAndError";


function Login({visible, setVisible}) { //logic about Authenticate request

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [userData, setUserData] = useState({login: '', password: ''})
    const [message, setMessage] = useState('')

    const location = useLocation()

    const [fetchLogin, isLoginLoading, loginError] = useFetching(async () => {
        const data = await AuthService.loginUser(userData)
        localStorage.setItem('authToken', 'Bearer ' + data.token)
        localStorage.setItem('refreshToken', 'Bearer ' + data.refreshToken)
        localStorage.setItem('auth', 'true')
        setVisible(false)
        setIsAuth(true)
    })

    useSetStateOnReact(loginError, setMessage)


    useEffect(() => {
        if (isAuth) {
            setVisible(false)
        }
        else if (location.pathname === "/message/unreachable") {
            setVisible(true)
            setMessage("Please, log in to continue")
        }
        else if (location.pathname === "/message/verified") {
            setVisible(true)
            setMessage(location.state)
        }
    }, [location])


    return (
        <ModalLogin
            isLoading={isLoginLoading}
            setMessage={setMessage}
            message={message} /*loginError*/
            visible={visible}
            setVisible={setVisible}
            loginFunction={fetchLogin}
            userData={userData}
            setUserData={setUserData}
        />
    );
}

export default Login;

