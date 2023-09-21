import React from 'react';
import {useDocumentTitle} from "usehooks-ts";
import MyButton from "../components/UI/buttons/MyButton";

function InfoPage() {

    useDocumentTitle("Information")

    return (
        <div>
            <h1> Some Info </h1>
            <MyButton>
                Click
            </MyButton>
        </div>
    );
}

export default InfoPage;