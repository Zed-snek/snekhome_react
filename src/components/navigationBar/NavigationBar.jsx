import {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext, UserContext} from "../context";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from "./NavigationBar.module.css"
import logo from "../../images/logo.png";
import signIco from "../../images/icons/signpost.svg";
import notificationIco from "../../images/icons/directboxnotif.svg";
import Login from "../login/Login";
import SearchDiv from "./search/SearchDiv";


function NavigationBar() {

    const {isAuth} = useContext(AuthContext)
    const {userImage, userNickname, isUserLoading} = useContext(UserContext)

    const [loginModal, setLoginModal] = useState(false)


    return (
    <header>
        <Navbar className={style.own_navbar} fixed="top" expand="lg">

            <Nav.Link as={Link} to="/">
                <img className={style.own_logo} id="own_logo" alt="Main Page" src={logo}/>
            </Nav.Link>

            <Navbar.Toggle
                className={style.own_toggler + " shadow-none"}
                id="own_toggler"
                aria-controls="basic-navbar-nav"
            /> {/*Hamburger-menu*/}

            <Navbar.Collapse id="basic-navbar-nav" className={style.collapsedDiv}>
                <Nav.Link as={Link} to="/home" className={style.communitiesDiv}  id={style["order_nav_Communities"]}>
                        <img className={style.communitiesIco + " bg-transparent"} src={signIco} />
                        Home
                </Nav.Link>

                <div className={style.searchDiv} id={style["order_nav_Search"]}>
                    <SearchDiv />
                </div>

                <div className={style.accountDiv} id={style["order_nav_Account"]}>
                    { isAuth
                        ? <>
                            <button className={style.notificationButton}>
                                <img className={style.communitiesIco + " bg-transparent"} src={notificationIco}/>
                            </button>

                            <Nav.Link as={Link} to={'/u/' + userNickname} className={style.accountInfoDiv}>
                                <img className={"userImage " + style.userImg} src={userImage} />
                                <div className={style.nicknameNavBarDiv}>
                                    {isUserLoading
                                        ? <span>loading...</span>
                                        : <span>{userNickname}</span>
                                    }
                                </div>
                            </Nav.Link>
                        </>
                        : <button
                            className={style.loginButton} id="loginButton"
                            onClick={() => setLoginModal(true)}
                        >
                            Login
                        </button>
                    }
                </div>
            </Navbar.Collapse>

        </Navbar>

        <Login visible={loginModal} setVisible={setLoginModal}/>
    </header>
    );
}

export default NavigationBar;

