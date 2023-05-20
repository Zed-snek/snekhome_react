import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import style from './UserPage.module.css'
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import settingIco from '../../images/settingIco.svg'
import logoutIco from  '../../images/logoutIco.svg'
import MyTransparentButton from "../../components/UI/buttons/MyTransparentButton";
import MessageModal from "../../components/UI/modal/MessageModal";
import OverImageDiv from "../../components/UI/blocks/OverImageDiv";
import UserService from "../../API/UserService";
import {getUserImage} from "../../functions/functions";
import DecreaseSizeDiv from "../../components/UI/blocks/DecreaseSizeDiv";
import InfoTag from "./InfoTag";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import {useDocumentTitle} from "usehooks-ts";
import {useLogout} from "../../hooks/useLogout";


function UserPage() {

    const params = useParams()
    const navigate = useNavigate()
    const logout = useLogout()

    useDocumentTitle(params.nickname)


    const [user, setUser] = useState({
        communities: '',
        friends: '',
        image: '',
        name: '',
        nickname: '',
        nicknameColor: '',
        surname: '',
        tags: []
    })

    const [isLogoutModal, setLogoutModal] = useState(false)

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const data = await UserService.userInfo(params.nickname)
        data.image = getUserImage(data.image)
        setUser(data)
    })

    useEffect(() => {
        fetchUser()
    }, [params.nickname])

    useEffect(() => {
        if (userError) {
            navigate('/not_found')
        }
    }, [userError])


    return (
        <div>

            <MySyncLoader loading={isUserLoading}/>


            <OutlineDiv className="flexDiv"> {/*User div*/}

                <div className={style.imageDiv}>
                    <OverImageDiv className={style.overImage} style={{color: user.nicknameColor}} sizebylength={'true'}>
                        {params.nickname}
                    </OverImageDiv>
                    <img src={user.image} className={style.image}/>
                </div>

                <div className={style.userInfoDiv}>

                    <InfoDiv className={style.nicknameDiv}>
                        <div className={style.name}>
                            <DecreaseSizeDiv className={style.nickname} size="px25">
                                {user.name + " " + user.surname}
                            </DecreaseSizeDiv>
                        </div>

                        <div className="noWrap">
                            <MyTransparentButton
                                className={style.nicknameIco}
                                tooltip="SettingsPage"
                                onClick={() => navigate('/settings')}>
                                <img src={settingIco} alt="settings"/>
                            </MyTransparentButton>

                            <MyTransparentButton
                                className={style.nicknameIco}
                                tooltip="Logout"
                                onClick={() => setLogoutModal(true)}>
                                <img src={logoutIco} alt="logout"/>
                            </MyTransparentButton>
                            <MessageModal
                                visible={isLogoutModal}
                                setVisible={setLogoutModal}
                                isAcceptButton={true}
                                acceptCallback={logout}
                            > {/*Logout Modal*/}
                                Are you sure you want to logout?
                            </MessageModal>

                        </div>

                    </InfoDiv>

                    <InfoDiv>

                        <div className={style.communitiesFriendsDiv}>
                            <div className={style.friendsBtn}>
                                <div>joined communities ({user.communities}) </div>
                            </div>
                            <div className={style.friendsBtn}>
                                <div>friends ({user.friends})</div>
                            </div>
                        </div>

                        <div className={style.tagsDiv}>
                            <h5>About</h5>

                            <div className={style.tagsMap}>
                            {user.tags.map(tag =>
                                <InfoTag
                                    key={tag.idTag}
                                    title={tag.title}
                                    text={tag.text}
                                />
                            )}
                            </div>

                        </div>


                    </InfoDiv>
                </div>


            </OutlineDiv>
        </div>


    );
}

export default UserPage;