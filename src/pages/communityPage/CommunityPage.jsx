import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import style from "./CommunityPage.module.css";
import anarchyImage from "../../images/communityTypes/anarchy.png";
import corporateImage from "../../images/communityTypes/corporate.png";
import demImage from "../../images/communityTypes/democracy.png";
import newsImage from "../../images/communityTypes/news.png";
import {getCommunityImage} from "../../functions/linkFunctions";
import MessageModal from "../../components/UI/modal/MessageModal";
import {useDocumentTitle} from "usehooks-ts";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import ClosedCommunityPage from "./ClosedCommunityPage";
import CommunityBanner from "./CommunityBanner";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import MyTextArea from "../../components/UI/inputs/MyTextArea";
import SortOutlineButtons from "../../components/UI/navigation/SortOutlineButtons";
import {toOnlyFirstLetterUpperCase} from "../../functions/stringFunctions";
import CommunityTypeBlock from "./CommunityTypeBlock";
import {useFetchCommunity} from "./useFetchCommunity";
import {AuthContext} from "../../components/context";

function CommunityPage() {

    const params = useParams()
    const navigate = useNavigate()
    const {isAuth} = useContext(AuthContext)
    useDocumentTitle(params.groupname.toLowerCase())


    const [activeSortBtn, setActiveSortBtn] = useState(0)

    const communityTypes = [
        {type: "ANARCHY", image: anarchyImage, color: '#ff1177'},
        {type: "CORPORATE", image: corporateImage, color: '#228dff'},
        {type: "DEMOCRACY", image: demImage, color: '#85b50e'},
        {type: "NEWSPAPER", image: newsImage, color: '#ff9900'},
    ]

    const [data, setData, isCommunityLoading] = useFetchCommunity(params.groupname)

    const [error, setError] = useState("")
    const [isModalError, setModalError] = useState(false)


    useEffect(() => {
        if (error)
            setModalError(true)
    }, [error])

    function getType() {
        return data.community ? data.community.type : data.type
    }

    function getGroupnameColor() {
        return communityTypes.find(type => type.type === getType()).color
    }
    function getTypeImage() {
        return communityTypes.find(type => type.type === getType()).image
    }

    if (data)
        if (!data.access)
            return (
                <ClosedCommunityPage
                    image={getCommunityImage(data.image)}
                    groupname={data.groupname}
                    name={data.name}
                    nameColor={getGroupnameColor()}
                    typeImage={getTypeImage()}
                    isRequestSent={data.requestSent}
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
                            {
                                isAuth ?
                                    <MyTextArea
                                        onClick={() => navigate("/new_post/" + params.groupname)}
                                        placeholder="New post..."
                                        className={style.newPostTextArea}
                                    >
                                    </MyTextArea>
                                    : <></>
                            }
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
                    <CommunityTypeBlock
                        image={getTypeImage()}
                        title={toOnlyFirstLetterUpperCase(data.community.type)}
                        color={getGroupnameColor()}
                        isClosed={data.community.closed}
                        isAnonymous={data.community.anonAllowed}
                    />
                </div>

            </div>



        </div>
        );
    else /*if content is loading*/
        return <MySyncLoader />
}

export default CommunityPage;