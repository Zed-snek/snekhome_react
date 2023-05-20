import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext, UserContext} from "../context";
import './NavigationBar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../images/logo.png"
import signIco from "../../images/signpost.svg"
import searchIco from "../../images/search.svg"
import notificationIco from "../../images/directboxnotif.svg"
import Login from "../login/Login";


function NavigationBar() {

    const {isAuth} = useContext(AuthContext)
    const {userImage, userNickname, isUserLoading} = useContext(UserContext)

    const [loginModal, setLoginModal] = useState(false)


    return (
        <header>
            <Navbar className="own_navbar" fixed="top" expand="lg">

                <Nav.Link as={Link} to="/">
                    <img className="own_logo" id="own_logo" alt="Main Page" src={logo}/>
                </Nav.Link>

                <Navbar.Toggle className="own_toggler shadow-none" id="own_toggler" aria-controls="basic-navbar-nav"/> {/*Hamburger-menu*/}


                <Navbar.Collapse id="basic-navbar-nav" className="collapsedDiv">

                        <Nav.Link as={Link} to="/posts" className="communitiesDiv"  id="order_nav_Communities">
                                <img className="communitiesIco bg-transparent" src={signIco} />
                                Communities
                        </Nav.Link>

                        <div className="searchDiv" id="order_nav_Search">
                            <input className="searchInput bg-transparent" placeholder="search..."/>
                            <button className="searchButton">
                                <img className="searchIco bg-transparent" src={searchIco} />
                            </button>
                        </div>

                        <div className="accountDiv" id="order_nav_Account">
                            {isAuth
                                ?
                                <>
                                    <button className="notificationButton">
                                        <img className="communitiesIco bg-transparent" src={notificationIco}/>
                                    </button>

                                    <Nav.Link as={Link} to={'/u/' + userNickname} className="accountInfoDiv">
                                        <img className="userImage" src={userImage} />
                                        <div className="nicknameNavBarDiv">
                                            {isUserLoading
                                                ? <span>loading...</span>
                                                : <span>{userNickname}</span>
                                            }
                                        </div>
                                    </Nav.Link>
                                </>
                                :
                                <button
                                    className="loginButton" id="loginButton"
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

