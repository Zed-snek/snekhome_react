import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from "react-bootstrap/CloseButton";
import {useForm} from "react-hook-form";
import './ModalLogin.css';
import MyButton from "../UI/buttons/MyButton";
import MyInput from "../UI/inputs/MyInput";
import MyTextLink from "../UI/links/MyTextLink";
import MyMessage from "../UI/message/MyMessage";


function ModalLogin(props) {

    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });


    function sendData(formValues){
        props.loginFunction(formValues.email, formValues.password);
    }

    return (
        <Modal
            show={props.visible}
            onHide={() => props.setVisible(false)}
            centered
            >

            <div className="own_modal own_bg_colorHeader">
                <Modal.Header className="bg-transparent">
                    <Modal.Title>Login</Modal.Title>
                    <CloseButton variant="white"
                                 className="shadow-none"
                                 onClick={() => props.setVisible(false)}
                    />
                </Modal.Header>

                <Modal.Body className="bg-transparent">

                    <MyMessage>{props.message}</MyMessage>

                    <form onSubmit={handleSubmit(sendData)}>

                        <label htmlFor="email">Your e-mail address:</label>
                        <MyInput
                            type="email" id="email" placeholder="e-mail"
                            register={register} name="email"
                        />

                        <label htmlFor="password">Your password:</label>
                        <MyInput
                            type="password" id="password" placeholder="password"
                            register={register} name="password"
                            required={true}
                        />

                        <div className="loginButtonDiv">
                            <div>
                                <span className="textAboveLink"> Don't have an account? </span> <br/>
                                <MyTextLink to="/register" onClick={() => props.setVisible(false)}>
                                    Register
                                </MyTextLink>
                            </div>
                            <div>
                                <MyButton color={"blue"}>
                                    Login
                                </MyButton>
                            </div>
                        </div>

                    </form>

                </Modal.Body>

            </div>

        </Modal>
    );
}

export default ModalLogin;