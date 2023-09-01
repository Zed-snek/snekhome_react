import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "./CommunityListPage.module.css";
import ellipsis from "../../styles/ellipsis.module.css";
import MyMessage from "../../components/UI/message/MyMessage";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {useDocumentTitle} from "usehooks-ts";
import {useIsCurrentUser} from "../../hooks/useIsCurrentUser";
import {getCommunityImage} from "../../functions/linkFunctions";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import BooleanBlock from "../../components/structureComponents/BooleanBlock";
import MyGreyInput from "../../components/UI/inputs/MyGreyInput";
import MidSizeContent from "../../components/structureComponents/MidSizeContent";

function CommunityListPage() {

    const params = useParams()
    useDocumentTitle('Communities')
    const isCurrent = useIsCurrentUser(params.nickname)

    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([{
        groupname: '',
        image: '',
        description: '',
        members: '',
        name: ''
    }])

    const [fetchCommunities, fetchLoading, fetchError] = useFetching(async () => {
        let response = await CommunityService.getJoinedCommunities(params.nickname)
        setData(response)
    })

    const [message, setMessage] = useState('')
    useEffect(() => {
        if (fetchError)
            setMessage(fetchError)
        else if (!fetchLoading && data.length === 0) {
            if (isCurrent)
                setMessage("You haven't joined to any communities yet")
            else
                setMessage(`${params.nickname} hasn't joined to any communities yet`)
        }
    }, [data, fetchError])

    useEffect(() => {
        fetchCommunities()
    }, [])

    const searchedElements = useMemo(() => {
        return data.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.groupname.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [data, searchQuery])

    async function manageCommunity(arrayIndex) {
        let name = data[arrayIndex].groupname
        await CommunityService.leaveCommunity(name)
            .then(() => setData(data.filter(o => o.groupname !== name)))
    }


    return (
        <MidSizeContent>
            <h4 className={style.title}>
                {isCurrent ? 'Communities you have joined' : `Communities ${params.nickname} has joined`}
            </h4>
            <OutlineDiv>
                <MyMessage>
                    {message}
                </MyMessage>

                <MySyncLoader loading={fetchLoading}/>

                <BooleanBlock bool={!fetchLoading && data.length > 0}>
                    <MyGreyInput
                        onChange={event => setSearchQuery(event.target.value)}
                        placeholder="search communities..."
                    />
                </BooleanBlock>

                <div>
                    { searchedElements.map((c, index) =>
                        <ListItemBlock
                            key={index}
                            image={getCommunityImage(c.image)}
                            title={c.name}
                            link={"/c/" + c.groupname}
                            idName={c.groupname}
                            buttonContent={isCurrent ? 'Leave' : ''}
                            buttonClick={() => manageCommunity(index)}
                            rightCornerContent={
                                <span className={style.members}>
                                    members ({c.members})
                                </span>
                            }
                            underIdContent={
                                <div className={style.description + " " + ellipsis.main}>
                                    <div className={ellipsis.childrenClamp3}>
                                        {c.description}
                                    </div>
                                </div>
                            }
                        />
                    )}
                </div>
            </OutlineDiv>
            <br/>
        </MidSizeContent>
    );
}

export default CommunityListPage;