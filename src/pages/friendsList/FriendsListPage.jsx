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
    const isCurrent = (userNickname.toLowerCase() === params.nickname.toLowerCase())

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
        }
        ])

    const [fetchFriends, fetchLoading, fetchError] = useFetching(async () => {
        let response = await UserService.getFriends(params.nickname)
        setData(response)
    })

    useEffect(() => {
        fetchFriends()
    }, [])


    async function manageFriend(nickname) {
        let type = types[activeBtn]
        let func
        if (type === "SECOND_FOLLOW")
            func = UserService.addFriend(nickname)
        else
            func = UserService.delFriend(nickname)
        await func.then(() => {
            let newType
            switch (type) {
                case "FRIENDS":
                    newType = "SECOND_FOLLOW"
                    break
                case "SECOND_FOLLOW":
                    newType = "FRIENDS"
                    break
                case "CURRENT_FOLLOW":
                    newType = "NOT_FRIENDS"
                    break
            }
            let index = data.findIndex(element => element.nickname === nickname)
            setData(prev => ([...prev, prev[index].friendshipType = newType]))
        })
    }

    function content() {
        let friends = data.filter(u => u.friendshipType === types[activeBtn])
        if (friends.length > 0)
            return friends.map( (user, index) =>
                        <div key={index} className={style.item}>
                            <ListItemBlock
                                image={getUserImage(user.image)}
                                title={user.name + ' ' + user.surname}
                                link={"/u/" + user.nickname}
                                idName={user.nickname}
                                buttonContent={isCurrent ? btnContent[activeBtn] : ''}
                                onClick={() => manageFriend(user.nickname)}
                            />
                        </div>
            )
        else
            return "Users not found"
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
                        {isCurrent ? "Users you follow" : "Users " + params.nickname + " follow"}
                    </MySortButton>
                </div>

                <OutlineDiv>
                    <MyMessage>
                        {fetchError}
                    </MyMessage>

                    <div>
                        {content()}
                    </div>
                </OutlineDiv>
            </div>
        </div>
    );
}

export default FriendsListPage;