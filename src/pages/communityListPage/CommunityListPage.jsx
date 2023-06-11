import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "./CommunityListPage.module.css";
import MyMessage from "../../components/UI/message/MyMessage";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {useDocumentTitle} from "usehooks-ts";
import {useIsCurrentUser} from "../../hooks/useIsCurrentUser";
import {getCommunityImage} from "../../functions/linkFunctions";
import {limitTextByLength} from "../../functions/stringFunctions";

function CommunityListPage() {

    const params = useParams()
    useDocumentTitle('Communities')
    const isCurrent = useIsCurrentUser(params.nickname)

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
        console.log(response)
    })

    useEffect(() => {
        fetchCommunities()
    }, [])

    async function manageCommunity(arrayIndex) {
        let name = data[arrayIndex].groupname
        await CommunityService.leaveCommunity(name)
            .then(() => setData(data.filter(o => o.groupname !== name)))
    }

    return (
        <div className={style.main}>
            <div className={style.content}>
                <div className={style.title}>
                    {isCurrent ? 'Communities you have joined' : `Communities ${params.nickname} has joined`}
                </div>
                <OutlineDiv>
                    <MyMessage>
                        {fetchError}
                    </MyMessage>

                    <div>
                        {
                            data.map((c, index) =>
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
                                        <div className={style.description}>
                                            {limitTextByLength(c.description + c.description, 220)}
                                        </div>
                                    }
                                />
                            )
                        }
                    </div>
                </OutlineDiv>
            </div>
        </div>
    );
}

export default CommunityListPage;