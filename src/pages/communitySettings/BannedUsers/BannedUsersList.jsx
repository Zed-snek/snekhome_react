import MidSizeContent from "../../../components/structureComponents/MidSizeContent";
import MyGreyInput from "../../../components/UI/inputs/MyGreyInput";
import OutlineDiv from "../../../components/UI/blocks/OutlineDiv";
import {useFetching} from "../../../hooks/useFetching";
import CommunityService from "../../../API/CommunityService";
import {useEffect, useState} from "react";
import {useMemoSearch} from "../../../hooks/useMemoSearch";
import ListItemBlock from "../../../components/UI/blocks/ListItemBlock";
import {getUserImage} from "../../../functions/linkFunctions";
import CommunityRoleFlair from "../../../components/community/CommunityRoleFlair";
import MyMessage from "../../../components/UI/message/MyMessage";
import MembersItemListMap from "../../membersListPage/MembersItemListMap";

function BannedUsersList({setError, setIsLoader, groupname}) {

    const [data, setData] = useState([])

    const [fetchUsers, isFetchLoading, fetchError] = useFetching(async () => {
        const response = await CommunityService.getBannedUsers(groupname)
        setData(response.users)
    })

    async function unbanUser(nickname) {
        await CommunityService.unbanUser(groupname, nickname)
            .then(() => setData(prev => prev.filter(u => u.nickname !== nickname)))
            .catch(exception => setError(exception))
    }

    const [searchedUsers, setSearchQuery] = useMemoSearch(data, ["name", "surname", "nickname"])

    useEffect(() => {
        if (fetchError)
            setError(fetchError)
    }, [fetchError])
    useEffect(() => {
        setIsLoader(isFetchLoading)
    }, [isFetchLoading])

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <MidSizeContent>
            <OutlineDiv>
                <MyGreyInput
                    onChange={event => setSearchQuery(event.target.value)}
                    placeholder="search users..."
                />

                <MembersItemListMap
                    array={searchedUsers}
                    buttonContent={() => "unban"}
                    onClickCallback={unbanUser}
                />

            </OutlineDiv>
        </MidSizeContent>
    );
}

export default BannedUsersList;