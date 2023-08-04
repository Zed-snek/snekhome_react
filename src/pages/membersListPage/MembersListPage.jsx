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
import CommunityRoleFlair from "../../components/community/CommunityRoleFlair";
import MoreOptionsButton from "../../components/UI/navigation/MoreOptionsButton";
import CommunityRoleListToSet from "../communitySettings/Users/CommunityRoleListToSet";

function MembersListPage({permissions, communityType, isCommunityClosed, setError, setIsLoader}) {

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
        return type === "All" || (user.communityRole && (type === "With flair" || type === user.communityRole.title))
    }

    const searchedAndSorted = useMemo(() => {
        return searchedElements.filter(u => isToShow(u))
    }, [activeBtn, data, searchQuery])

    function buttonContent(userRole) {
        if (permissions && communityType !== 'ANARCHY'
            && (permissions.creator || permissions.banCitizen || permissions.banUser)
            && (
                (permissions.banUser && !userRole)
                || (communityType.type === 'DEMOCRACY' && permissions.banCitizen && userRole.citizen)
                || (permissions.creator && !userRole.creator)
            )
        ) {
            return 'Kick'
        }
        return ''
    }
    function moreOptionsContent(userRole, nickname) {
        if (permissions && permissions.creator && communityType !== "ANARCHY"  && !(userRole && userRole.creator)) {
            let options = [{title: "Set role", onClick: () => setRole(nickname, false)}]
            if (userRole)
                options.push({title: "Revoke role", onClick: () => setRole(nickname, true)})
            return <MoreOptionsButton
                options={options}
            />
        }
    }

    async function banUser(nickname) {
        const responseData = await CommunityService.banUser(params.groupname, nickname)
            .catch(exception => setError(exception))
        if (responseData.status === 200)
            setData(prev => ({...prev, users: prev.users.filter(u => u.nickname !== nickname)}))
    }

    const [isRoleShow, setRoleShow] = useState({isShow: false, nickname: ''})

    async function revokeRole(nickname) {
        await CommunityService.revokeRole(params.groupname, nickname)
            .then(() =>
                setData(prev => {
                    let obj = {...prev}
                    delete obj.users[obj.users.findIndex(u => u.nickname === nickname)].communityRole
                    return obj
                })
            )
            .catch(err => setError(err.message))
    }

    function setRole(nickname, isDelete) {
        if (isDelete)
            revokeRole(nickname)
        else
            setRoleShow({isShow: true, nickname: nickname})
    }


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
                                buttonContent={buttonContent(user.communityRole)}
                                buttonClick={() => banUser(user.nickname)}
                                rightCornerContent={moreOptionsContent(user.communityRole, user.nickname)}
                                underIdContent={user.communityRole
                                    ? <CommunityRoleFlair
                                            title={user.communityRole.title}
                                            color={user.communityRole.bannerColor}
                                            textColor={user.communityRole.textColor}
                                    />
                                    : ''
                                }
                            />
                            )
                        : <MyMessage> Users not found </MyMessage>
                }

            </OutlineDiv>

            {
                permissions ?
                    <CommunityRoleListToSet
                        visibleAndNickname={isRoleShow}
                        setVisibleAndNickname={setRoleShow}
                        setError={setError}
                        setIsLoader={setIsLoader}
                        groupname={params.groupname}
                        communityType={communityType}
                        setUsers={setData}
                        isCommunityClosed={isCommunityClosed}
                    />
                    : ''
            }

        </MidSizeContent>
    );
}

export default MembersListPage;