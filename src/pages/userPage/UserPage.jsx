import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import style from './UserPage.module.css';
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import OverImageDiv from "../../components/UI/blocks/OverImageDiv";
import UserService from "../../API/UserService";
import {getUserImage} from "../../functions/linkFunctions";
import InfoTag from "./InfoTag";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import {useDocumentTitle} from "usehooks-ts";
import UserNicknameButtons from "./UserNicknameButtons";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";

function UserPage() {

    const params = useParams()

    const [user, setUser] = useState({
        communities: '',
        friends: '',
        friendshipType: '',
        image: '',
        name: '',
        nickname: '',
        nicknameColor: '',
        surname: '',
        tags: []
    })
    useDocumentTitle(user.nickname)

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const data = await UserService.userInfo(params.nickname)
        data.image = getUserImage(data.image)
        setUser(data)
        console.log(data)
    })

    useEffect(() => {
        fetchUser()
    }, [params.nickname])

    useNotFoundNavigate(userError)

    function setFriendshipType(type) {
        setUser({...user, friendshipType: type})
    }

    return (
        <div className={style.main}>
            <MySyncLoader loading={isUserLoading} />

            <OutlineDiv className="flexDiv"> {/*User div*/}

                <div className={style.imageDiv}>
                    <OverImageDiv className={style.overImage} style={{color: user.nicknameColor}} sizeByLength={true}>
                        {user.nickname}
                    </OverImageDiv>
                    <img src={user.image} className={style.image}/>
                </div>

                <div className={style.userInfoDiv}>

                    <InfoDiv className={style.nicknameDiv}>
                        <div className={style.name}>
                            <div className={style.nickname} >
                                {user.name + " " + user.surname}
                            </div>
                        </div>

                        <UserNicknameButtons
                            friendshipType={user.friendshipType}
                            setFriendshipType={setFriendshipType}
                        />

                    </InfoDiv>

                    <InfoDiv>

                        <div className={style.communitiesFriendsDiv}>
                            <Link to={"/communities/" + user.nickname} className={style.friendsBtn}>
                                <div>joined communities ({user.communities}) </div>
                            </Link>
                            <Link to={"/friends/" + user.nickname} className={style.friendsBtn}>
                                <div>friends ({user.friends})</div>
                            </Link>
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