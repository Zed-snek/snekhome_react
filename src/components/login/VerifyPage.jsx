import {useEffect} from 'react';
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {useNavigate, useParams} from "react-router-dom";
import MySyncLoader from "../UI/loaders/MySyncLoader";
import MyMessage from "../UI/message/MyMessage";

function VerifyPage() {

    const pathParams = useParams()
    const navigate = useNavigate()

    const [fetchVerify, isVerifyLoading, verifyError] = useFetching(async () => {
        await AuthService.manageConfirmation(pathParams.token)
        navigate("../message/verified", {replace: true, state: "Your email is verified, log in to continue"})
    })

    useEffect( () => {
            fetchVerify()
        })

    return (
        <div>
            { isVerifyLoading
                ?  <MySyncLoader />
                :  <MyMessage> {verifyError} </MyMessage>
            }
        </div>
    );
}

export default VerifyPage;