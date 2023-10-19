import {useMemo, useState, useEffect} from 'react';
import style from "./MembersListPage.module.css";
import MidSizeContent from "../../components/structureComponents/MidSizeContent";
import {useNavigate, useParams} from "react-router-dom";
import {useDocumentTitle} from "usehooks-ts";
import SortButtons from "../../components/UI/navigation/SortButtons";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import MyGreyInput from "../../components/UI/inputs/MyGreyInput";
import MyMessage from "../../components/UI/message/MyMessage";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import MoreOptionsButton from "../../components/UI/navigation/MoreOptionsButton";
import CommunityRoleListToSet from "../communitySettings/Users/CommunityRoleListToSet";
import {useMemoSearch} from "../../hooks/useMemoSearch";
import MembersItemListMap from "./MembersItemListMap";
import {getErrorResponseMessage} from "../../functions/objectFunctions";

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


    function isToShow(user) {
        let type = buttons[activeBtn]
        return type === "All" || (user.communityRole && (type === "With flair" || type === user.communityRole.title))
    }

    const [searchedElements, setSearchQuery] = useMemoSearch(data.users, ["name", "surname", "nickname"])

    const searchedAndSorted = useMemo(() => {
        return searchedElements.filter(u => isToShow(u))
    }, [activeBtn, searchedElements])

    function buttonContent(userRole) {
        if (permissions && communityType !== 'ANARCHY'
            && (permissions.creator || permissions.banCitizen || permissions.banUser)
            && ((permissions.banUser && !userRole)
                || (communityType.type === 'DEMOCRACY' && permissions.banCitizen && userRole.citizen)
                || (permissions.creator && !userRole.creator))
        ) {
            return 'Ban'
        }
        return ''
    }
    function moreOptionsContent(userRole, nickname) {
        if (permissions && permissions.creator && communityType !== "ANARCHY"  && !(userRole && userRole.creator)) {
            let options = [{title: "Set role", onClick: () => setRole(nickname, false)}]
            if (userRole && !userRole.citizen)
                options.push({title: "Revoke role", onClick: () => setRole(nickname, true)})
            return <MoreOptionsButton
                options={options}
            />
        }
    }

    async function banUser(nickname) {
        await CommunityService.banUser(params.groupname, nickname)
            .then(() => setData(prev => ({...prev, users: prev.users.filter(u => u.nickname !== nickname)})))
            .catch(exception => setError(getErrorResponseMessage(exception)))
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
            .catch(exception => setError(getErrorResponseMessage(exception)))
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

                { !fetchLoading && data.users.length ?
                    <MyGreyInput
                        onChange={event => setSearchQuery(event.target.value)}
                        placeholder="search members..."
                    />
                : <></> }

                <MembersItemListMap
                    array={searchedAndSorted}
                    buttonContent={buttonContent}
                    onClickCallback={banUser}
                    moreOptionsFunction={moreOptionsContent}
                />

            </OutlineDiv>
            <br/>
            { permissions ?
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
            : '' }

        </MidSizeContent>
    );
}

export default MembersListPage;