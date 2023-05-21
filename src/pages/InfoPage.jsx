import React from 'react';
import {useDocumentTitle} from "usehooks-ts";
import MyCheckbox from "../components/UI/inputs/MyCheckbox";

function InfoPage() {

    useDocumentTitle("Information")

    return (
        <div>
            <h1> Some Info </h1>

        </div>
    );
}

export default InfoPage;