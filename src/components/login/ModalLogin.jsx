import Modal from 'react-bootstrap/Modal';
import CloseButton from "react-bootstrap/CloseButton";
import {useForm} from "react-hook-form";
import style from "./ModalLogin.module.css";
import MyButton from "../UI/buttons/MyButton";
import MyInput from "../UI/inputs/MyInput";
import MyTextLink from "../UI/links/MyTextLink";
import MyMessage from "../UI/message/MyMessage";
import TransparentModal from "../UI/modal/TransparentModal";


function ModalLogin({visible, setVisible, loginFunction, message}) {

    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function sendData(formValues){
        loginFunction(formValues.email, formValues.password);
    }

    return (
        <TransparentModal
            visible={visible}
            setVisible={setVisible}
            isCloseBtn={false}
        >
            <Modal.Header className={style.header}>
                <Modal.Title> Login </Modal.Title>

                <CloseButton
                    variant="white"
                    className="shadow-none"
                    onClick={() => setVisible(false)}
                />
            </Modal.Header>

            <Modal.Body>
                <MyMessage>
                    {message}
                </MyMessage>

                <form onSubmit={handleSubmit(sendData)}>

                    <label htmlFor="email">
                        Your e-mail address:
                    </label>
                    <MyInput
                        type="email" id="email" placeholder="e-mail"
                        register={register} name="email"
                    />

                    <label htmlFor="password">
                        Your password:
                    </label>
                    <MyInput
                        type="password" id="password" placeholder="password"
                        register={register} name="password"
                        required={true}
                    />

                    <div className={style.loginButtonDiv}>
                        <div>
                            <span className={style.textAboveLink}>
                                Don't have an account?
                            </span> <br/>

                            <MyTextLink to="/register" onClick={() => setVisible(false)}>
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
        </TransparentModal>
    );
}

export default ModalLogin;