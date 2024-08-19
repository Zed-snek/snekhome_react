import {useDocumentTitle} from "usehooks-ts";
import MyMessage from "../components/UI/message/MyMessage";


function InfoPage() {
    useDocumentTitle("Information")

    return (
        <div>
            <MyMessage>
                Log in to get access to functionality of snek-home
            </MyMessage>
        </div>
    );
}

export default InfoPage;