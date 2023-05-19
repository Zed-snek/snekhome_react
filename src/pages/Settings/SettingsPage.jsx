import React, {useEffect, useState, useContext} from 'react';
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import SettingsNavbar from "./SettingsNavbar";
import style from "./Settings.module.css"
import AccountPage from "./Account/AccountPage";
import AboutUserPage from "./AboutUser/AboutUserPage";
import Security from "./Security/SecurityPage";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import MessageModal from "../../components/UI/modal/MessageModal";
import MyTextLink from "../../components/UI/links/MyTextLink";
import {UserContext} from "../../components/Context";
import {useDocumentTitle} from "usehooks-ts";

function SettingsPage() {

    const {userNickname} = useContext(UserContext)

    useDocumentTitle("Settings")

    const [user, setUser] = useState({
        email: '',
        name: '',
        surname: '',
        tags: []
    })


    const [fetchUser, isUserLoading, errorUser] = useFetching(async () => {
        const data = await UserService.currentUserInfo()
        setUser(data)
    })
    useEffect(() => {
        fetchUser()
    }, [])


    const [isErrorModal, setIsErrorModal] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        if (error || errorUser)
            setIsErrorModal(true)

        if (errorUser)
            setError(errorUser)

    }, [error, errorUser])


    const [isLoader, setIsLoader] = useState(false)

    useEffect(() => {
        if (isUserLoading)
            setIsLoader(true)
        else
            setIsLoader(false)
    }, [isUserLoading])


    const [currentPage, setPage] = useState(1)
    function content() {
        switch (currentPage) {
            case 1:
                return <AccountPage
                    setLoader={setIsLoader}
                    setError={setError}
                    setUser={setUser}
                    name={user.name}
                    surname={user.surname}
                />
            case 2:
                return <AboutUserPage
                    setLoader={setIsLoader}
                    setError={setError}
                    fetchUser={fetchUser}
                    tags={user.tags}
                    setUser={setUser}
                />
            case 3:
                return <Security
                    loader={setIsLoader}
                    currentEmail={user.email}
                />
        }
    }

    return (
        <div className={style.main}>

            <SettingsNavbar callback={setPage} page={currentPage}/>

            <div className={style.content}>
                <h2>
                    Settings
                    <div className={style.loader}>
                        <MySyncLoader loading={isLoader}/>
                    </div>
                </h2>
                <div className={style.link}>
                    <MyTextLink to={"/u/" + userNickname}>Go back</MyTextLink>
                </div>

                <MessageModal
                    visible={isErrorModal}
                    setVisible={setIsErrorModal}
                >
                    {error}
                </MessageModal>

                <OutlineDiv>
                    {content()}
                </OutlineDiv>

            </div>
        </div>
    );
}

export default SettingsPage;