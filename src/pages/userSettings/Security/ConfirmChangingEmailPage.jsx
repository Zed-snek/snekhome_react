import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import AuthService from "../../../API/AuthService";
import MySyncLoader from "../../../components/UI/loaders/MySyncLoader";
import MyMessage from "../../../components/UI/message/MyMessage";
import {useLogout} from "../../../hooks/useLogout";

function ConfirmChangingEmailPage({message}) {
    const [ms, setMs] = useState('')

    const pathParams = useParams()
    const logout = useLogout()
    const navigate = useNavigate()

    const [fetch, loading, error] = useFetching(async () => {
        await AuthService.manageConfirmation(pathParams.token)
        if (message === "logout") {
            logout()
            navigate("../message/verified", {replace: true, state: "Your new email is verified, log in to continue"})
        }
        else
            setMs(message)
    })

    useEffect(() => {
        fetch()
    }, [])



    useEffect(() => {
        setMs(error)
    }, [error])

    return (
        <div>
            <MySyncLoader loading={loading} />
            <MyMessage>{ms}</MyMessage>
        </div>
    );
}

export default ConfirmChangingEmailPage;