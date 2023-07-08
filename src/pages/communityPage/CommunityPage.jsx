import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import style from "./CommunityPage.module.css";
import anarchyImage from "../../images/communityTypes/anarchy.png";
import corporateImage from "../../images/communityTypes/corporate.png";
import demImage from "../../images/communityTypes/democracy.png";
import newsImage from "../../images/communityTypes/news.png";
import {getCommunityImageByArray} from "../../functions/linkFunctions";
import MessageModal from "../../components/UI/modal/MessageModal";
import {useDocumentTitle} from "usehooks-ts";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import ClosedCommunityPage from "./ClosedCommunityPage";
import {useIsCurrentUser} from "../../hooks/useIsCurrentUser";
import CommunityBanner from "./CommunityBanner";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import MyTextArea from "../../components/UI/inputs/MyTextArea";
import SortOutlineButtons from "../../components/UI/navigation/SortOutlineButtons";

function CommunityPage() {

    const params = useParams()
    const navigate = useNavigate()
    useDocumentTitle(params.groupname.toLowerCase())

    const [data, setData] = useState()
    const isCurrentUserCreator = useIsCurrentUser(data ? data.ownerNickname : '')

    const [activeSortBtn, setActiveSortBtn] = useState(0)

    const communityTypes = [
        {type: "ANARCHY", image: anarchyImage, color: '#ff1177'},
        {type: "CORPORATE", image: corporateImage, color: '#228dff'},
        {type: "DEMOCRACY", image: demImage, color: '#85b50e'},
        {type: "NEWSPAPER", image: newsImage, color: '#ff9900'},
    ]

    const [fetchCommunity, isCommunityLoading, communityError] = useFetching(async () => {
        let responseData = await CommunityService.getCommunity(params.groupname)
        setData(responseData)
        console.log(responseData)
    })


    useEffect(() => {
        fetchCommunity()
    }, [])

    useNotFoundNavigate(communityError)

    const [error, setError] = useState("")
    const [isModalError, setModalError] = useState(false)


    useEffect(() => {
        if (error)
            setModalError(true)
    }, [error])

    function getGroupnameColor() {
        return communityTypes.find(type => type.type === data.community.type).color
    }
    function getTypeImage() {
        return communityTypes.find(type => type.type === data.community.type).image
    }

    if (data)
        if (!data.member && data.community.closed && !isCurrentUserCreator)
            return (
                <ClosedCommunityPage
                    image={getCommunityImageByArray(data.community.images)}
                    groupname={data.community.groupname}
                    name={data.community.name}
                    nameColor={getGroupnameColor()}
                    typeImage={getTypeImage()}
                />
            );
        else
            return (
        <div>

            <MessageModal visible={isModalError} setVisible={setModalError}>
                {error}
            </MessageModal>

            <CommunityBanner
                    data={data}
                    setData={setData}
                    groupnameColor={getGroupnameColor()}
                    typeImage={getTypeImage()}
                    groupname={params.groupname}
                    setError={setError}
            />

            <div className={style.page}>

                <div className={style.content}>
                    <OutlineFilledDiv
                        className={style.newPostAndSortBanner}
                    >
                        <div className={style.newPostDiv}>
                            <MyTextArea
                                onClick={() => navigate("/new_post")}
                                placeholder="New post..."
                                rows={1}
                                className={style.newPostTextArea}
                            >
                            </MyTextArea>
                        </div>
                        <div className={style.sortButtons}>
                            <SortOutlineButtons
                                buttons={["Hot", "New"]}
                                activeBtn={activeSortBtn}
                                setActiveBtn={setActiveSortBtn}
                            />
                        </div>
                    </OutlineFilledDiv>



                </div>

                <div className={style.additionalInfoBlock}>
                    <OutlineFilledDiv>
                        Anarchy
                    </OutlineFilledDiv>
                </div>

            </div>



        </div>
        );
    else /*if content is loading*/
        return <MySyncLoader />
}

export default CommunityPage;