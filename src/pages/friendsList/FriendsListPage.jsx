import React, {useMemo, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "./FriendsListPage.module.css";
import MySortButton from "../../components/UI/buttons/MySortButton";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {useFetching} from "../../hooks/useFetching";
import MyMessage from "../../components/UI/message/MyMessage";
import UserService from "../../API/UserService";
import {getUserImage} from "../../functions/linkFunctions";
import {useIsCurrentUser} from "../../hooks/useIsCurrentUser";
import {useDocumentTitle} from "usehooks-ts";
import BooleanBlock from "../../components/UI/blocks/BooleanBlock";
import MyGreyInput from "../../components/UI/inputs/MyGreyInput";
import MidSizeContent from "../../components/UI/blocks/MidSizeContent";
import SortButtons from "../../components/UI/navigation/SortButtons";

function FriendsListPage() {

    const params = useParams()
    const isCurrent = useIsCurrentUser(params.nickname)
    useDocumentTitle('Friends - ' + params.nickname)

    const [activeBtn, setActiveBtn] = useState(0)
    const types = ["FRIENDS", "SECOND_FOLLOW", "CURRENT_FOLLOW"]
    const btnContent = ["Remove", "Accept", "Unfollow"]

    const [data, setData] = useState([{
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


    const sortedFriends = useMemo(() => {
        return data.filter(u => u.friendshipType === types[activeBtn])
    }, [data, activeBtn])

    const [searchQuery, setSearchQuery] = useState('')
    const searchedAndSortedElements = useMemo(() => {
        return sortedFriends.filter(u =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase())
            || u.surname.toLowerCase().includes(searchQuery.toLowerCase())
            || u.nickname.toLowerCase().includes(searchQuery.toLowerCase())
            )
    }, [data, searchQuery, activeBtn])




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
        if (searchedAndSortedElements.length > 0)
            return searchedAndSortedElements.map( (user, index) =>
                            <ListItemBlock
                                key={index}
                                image={getUserImage(user.image)}
                                title={user.name + ' ' + user.surname}
                                link={"/u/" + user.nickname}
                                idName={user.nickname}
                                buttonContent={isCurrent ? btnContent[activeBtn] : ''}
                                buttonClick={() => manageFriend(user.nickname)}
                            />
            )
        else
            return <MyMessage>
                Users not found
            </MyMessage>
    }

    return (
        <MidSizeContent>

                <div className={style.buttons}>
                    <SortButtons
                        buttons={["Friends", "Followers", isCurrent ? "Users you follow" : "Users " + params.nickname + " follow"]}
                        activeBtn={activeBtn}
                        setActiveBtn={setActiveBtn}
                    />
                </div>


                <OutlineDiv>
                    <MyMessage>
                        {fetchError}
                    </MyMessage>

                    <BooleanBlock bool={!fetchLoading && data.length > 0}>
                        <MyGreyInput
                            onChange={event => setSearchQuery(event.target.value)}
                            placeholder="search friends..."
                        />
                    </BooleanBlock>

                    <div>
                        {content()}
                    </div>
                </OutlineDiv>
        </MidSizeContent>
    );
}

export default FriendsListPage;