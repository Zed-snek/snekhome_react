import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "./FriendsListPage.module.css";
import MySortButton from "../../components/UI/buttons/MySortButton";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {useFetching} from "../../hooks/useFetching";
import MyMessage from "../../components/UI/message/MyMessage";
import UserService from "../../API/UserService";
import {getUserImage} from "../../functions/linkFunctions";
import {UserContext} from "../../components/context";

function FriendsListPage() {

    const params = useParams()
    const {userNickname} = useContext(UserContext)

    const [activeBtn, setActiveBtn] = useState(0)
    const types = ["FRIENDS", "SECOND_FOLLOW", "CURRENT_FOLLOW"]
    const btnContent = ["Remove", "Accept", "Unfollow"]

    const [data, setData] = useState([
        {
            friendshipType: "",
            image: "",
            name: "" ,
            nickname: "",
            surname: ""
        }])

    const [fetchFriends, fetchLoading, fetchError] = useFetching(async () => {
        let response = await UserService.getFriends(params.nickname)
        setData(response)
    })

    useEffect(() => {
        fetchFriends()
    }, [])

    function manageFriend() {
        //todo manageFriend usings types = ["FRIENDS", "SECOND_FOLLOW", "CURRENT_FOLLOW"]
    }

    function buttonContent() {
        if (userNickname.toLowerCase() === params.nickname.toLowerCase())
            return btnContent[activeBtn]
        return '';
    }

    return (
        <div className={style.main}>
            <div className={style.content}>
                <div className={style.buttons}>
                    <MySortButton isActive={activeBtn === 0} onClick={() => setActiveBtn(0)}>
                        Friends
                    </MySortButton>
                    <div className={style.dot}>
                        ·
                    </div>
                    <MySortButton isActive={activeBtn === 1} onClick={() => setActiveBtn(1)}>
                        Followers
                    </MySortButton>
                    <div className={style.dot}>
                        ·
                    </div>
                    <MySortButton isActive={activeBtn === 2} onClick={() => setActiveBtn(2)}>
                        Users you follow
                    </MySortButton>
                </div>

                <OutlineDiv>
                    <MyMessage>
                        {fetchError}
                    </MyMessage>

                    { data.filter(u => u.friendshipType === types[activeBtn]).map( (user, index) =>
                        <ListItemBlock
                            key={index}
                            image={getUserImage(user.image)}
                            title={user.name + ' ' + user.surname}
                            link={"/u/" + user.nickname}
                            idName={user.nickname}
                            buttonContent={buttonContent()}
                            onClick={() => manageFriend}
                        />
                    )}

                </OutlineDiv>
            </div>
        </div>
    );
}

export default FriendsListPage;