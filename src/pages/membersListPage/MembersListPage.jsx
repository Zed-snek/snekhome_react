import React, {useMemo, useState, useEffect} from 'react';
import style from "./MembersListPage.module.css";
import MidSizeContent from "../../components/UI/blocks/MidSizeContent";
import {useNavigate, useParams} from "react-router-dom";
import {useDocumentTitle} from "usehooks-ts";
import SortButtons from "../../components/UI/navigation/SortButtons";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import MyGreyInput from "../../components/UI/inputs/MyGreyInput";
import BooleanBlock from "../../components/UI/blocks/BooleanBlock";
import MyMessage from "../../components/UI/message/MyMessage";
import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {getUserImage} from "../../functions/linkFunctions";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";

function MembersListPage() {

    const params = useParams()
    useDocumentTitle('Members - ' + params.groupname)
    const navigate = useNavigate()

    const [activeBtn, setActiveBtn] = useState(0)
    const defaultButtons = ["All", "With flair"]
    const [buttons, setButtons] = useState(defaultButtons)

    const [data, setData] = useState({
        users: [{
            image: "",
            name: "" ,
            nickname: "",
            surname: "",
            communityRole: ""
        }],
        roles: [""]
    })

    const [fetchMembers, fetchLoading, fetchError] = useFetching(async () => {
        let response = await CommunityService.getMembers(params.groupname)
        if (response.contextUserAccess) {
            setData(response)
            setButtons(defaultButtons.concat(response.roles))
        }
        else {
            navigate('/c/' + params.groupname)
        }
    })

    useEffect(() => {
        fetchMembers()
    }, [])

    const [searchQuery, setSearchQuery] = useState('')
    const searchedElements = useMemo(() => {
        return data.users.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase())
            || c.surname.toLowerCase().includes(searchQuery.toLowerCase())
            || c.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [data, searchQuery])

    function isToShow(user) {
        let type = buttons[activeBtn]
        if (type === "All")
            return true
        if (user.communityRole) {
            if (type === "With flair")
                return true
            if (type === user.communityRole.title)
                return true
        }
        return false
    }

    const searchedAndSorted = useMemo(() => {
        return searchedElements.filter(u => isToShow(u))
    }, [activeBtn, data, searchQuery])

    function manageUser(nickname) {

    } //todo

    if (fetchLoading)
        return (
            <MidSizeContent>
                <MySyncLoader />
            </MidSizeContent>
        );
    else return (
        <MidSizeContent>
            <div className={style.buttons}>
                <SortButtons
                    buttons={buttons}
                    activeBtn={activeBtn}
                    setActiveBtn={setActiveBtn}
                />
            </div>

            <OutlineDiv>
                <MyMessage>
                    {fetchError}
                </MyMessage>

                <BooleanBlock bool={!fetchLoading && data.users.length }>
                    <MyGreyInput
                        onChange={event => setSearchQuery(event.target.value)}
                        placeholder="search members..."
                    />
                </BooleanBlock>

                {
                    searchedAndSorted.length > 0
                        ? searchedAndSorted.map( (user, index) =>
                            <ListItemBlock
                                key={index}
                                image={getUserImage(user.image)}
                                title={user.name + ' ' + user.surname}
                                link={"/u/" + user.nickname}
                                idName={user.nickname}
                                buttonContent={'K1CK'}
                                buttonClick={() => manageUser(user.nickname)}
                            />
                            )
                        : <MyMessage> Users not found </MyMessage>
                }

            </OutlineDiv>

        </MidSizeContent>
    );
}

export default MembersListPage;