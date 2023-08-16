import React, {useEffect, useState} from 'react';
import style from "./JoinRequestsPage.module.css";
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import CommunityService from "../../API/CommunityService";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import ImageNicknameListItem from "../../components/community/ImageNicknameListItem";
import {getUserImage} from "../../functions/linkFunctions";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import MyButton from "../../components/UI/buttons/MyButton";
import MyMessage from "../../components/UI/message/MyMessage";

function JoinRequestsPage() {

    const params = useParams()

    const [data, setData] = useState([])
    const [error, setError] = useState("")

    const [fetchRequests, isFetchLoading, fetchError] = useFetching(async () => {
        const responseData = await CommunityService.getJoinRequests(params.groupname)
        setData(responseData)
    })

    useNotFoundNavigate(fetchError)

    useEffect(() => {
        fetchRequests()
    }, [])

    function deleteRequestFromArray(nickname) {
        setData(prev => prev.filter(element => element.nickname !== nickname))
    }

    async function manageRequest(nickname, action) {
        let func
        if (action === "ACCEPT")
            func = CommunityService.acceptJoinRequest(params.groupname, nickname)
        else
            func = CommunityService.cancelJoinRequest(params.groupname, nickname)
        await func
            .catch(e => setError(e))
            .then(() => {
                deleteRequestFromArray(nickname)
                setError("")
            })
    }

    if (data)
        return (
            <div className={style.main}>
                <div className={style.content}>
                    <h3>You can accept these join requests</h3>
                    <MyMessage>{error}</MyMessage>
                    <OutlineDiv className={style.outlineDiv}>
                        { data.length === 0
                            ? <MyMessage> No requests left </MyMessage>
                            : data.map((element, index) =>
                                <ImageNicknameListItem
                                    key={index}
                                    image={getUserImage(element.image)}
                                    nickname={element.nickname}
                                    rightContent={
                                        <div className={style.buttons}>
                                            <MyButton onClick={() => manageRequest(element.nickname, "ACCEPT")}>
                                                Accept
                                            </MyButton>
                                            <MyButton color="red"
                                                      onClick={() => manageRequest(element.nickname, "CANCEL")}
                                            >
                                                Cancel
                                            </MyButton>
                                        </div>
                                    }
                                />
                            )
                        }
                    </OutlineDiv>
                    <br/>
                </div>
            </div>
        );
    else
        return <MySyncLoader />
}

export default JoinRequestsPage;