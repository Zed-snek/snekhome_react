import {useDocumentTitle} from "usehooks-ts";


function InfoPage() {

    useDocumentTitle("Information")


    return (
        <div>
            <h1> Some Info </h1>

        </div>
    );
}

export default InfoPage;