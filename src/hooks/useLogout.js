import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../components/context";

export function useLogout() {
    const navigate = useNavigate()
    const {setIsAuth} = useContext(AuthContext)

    function logout() {
        setIsAuth(false)
        localStorage.removeItem('authToken')
        localStorage.removeItem('auth')
        navigate('/communities')
    }

    return logout
}