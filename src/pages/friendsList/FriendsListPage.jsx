import {useMemo, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "./FriendsListPage.module.css";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {useFetching} from "../../hooks/useFetching";
import MyMessage from "../../components/UI/message/MyMessage";
import UserService from "../../API/UserService";
import {getUserImage} from "../../functions/linkFunctions";
import {useIsCurrentUser} from "../../hooks/useIsCurrentUser";
import {useDocumentTitle} from "usehooks-ts";
import MyGreyInput from "../../components/UI/inputs/MyGreyInput";
import MidSizeContent from "../../components/structureComponents/MidSizeContent";
import SortButtons from "../../components/UI/navigation/SortButtons";
import {useMemoSearch} from "../../hooks/useMemoSearch";

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


    const [searchedElements, setSearchQuery] = useMemoSearch(data, ["name", "surname", "nickname"])
    const sortedAndSearchedFriends = useMemo(() => {
        return searchedElements.filter(u => u.friendshipType === types[activeBtn])
    }, [activeBtn, searchedElements])


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
        if (sortedAndSearchedFriends.length > 0)
            return sortedAndSearchedFriends.map( (user, index) =>
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

                    { !fetchLoading && data.length > 0 ?
                        <MyGreyInput
                            onChange={event => setSearchQuery(event.target.value)}
                            placeholder="search friends..."
                        />
                    : <></> }

                    <div>
                        {content()}
                    </div>
                </OutlineDiv>
                <br/>
        </MidSizeContent>
    );
}

export default FriendsListPage;