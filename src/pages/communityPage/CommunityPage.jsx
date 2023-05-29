import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import style from "./CommunityPage.module.css";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import anarchyImage from "../../images/communityTypes/anarchy.png";
import corporateImage from "../../images/communityTypes/corporate.png";
import demImage from "../../images/communityTypes/democracy.png";
import newsImage from "../../images/communityTypes/news.png";
import {getCommunityImage, getUserImage} from "../../functions/functions";
import {formatCommunityCreationDate} from "../../functions/stringFunctions";
import MyOutlineButton from "../../components/UI/buttons/MyOutlineButton";
import UserInfo from "../../components/post/userInfo";
function CommunityPage() {

    const [data, setData] = useState()

    const params = useParams()
    const navigate = useNavigate()

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

    useEffect(() => {
        if (communityError)
            navigate('/not_found')
    }, [communityError])

    return (
        data ?
        <div>

            <OutlineDiv>
                <InfoDiv className={style.bannerDiv}>

                    <div className={style.leftDiv}>
                        <div className={style.imageDateDiv}>
                            <div className={style.imgDiv}>
                                <img src={getCommunityImage(data.community.images)} />
                            </div>
                            <div className={style.groupname}>
                                @{params.groupname}
                            </div>
                            <div className={style.date}>
                                created {formatCommunityCreationDate(data.community.creation)}
                            </div>
                        </div>

                        <div>
                            <div className={style.titleDiv}>
                                <span style={{color: communityTypes.find(type => type.type === data.community.type ).color}}>
                                    {data.community.name}
                                </span>
                                <img
                                    src={communityTypes.find(type => type.type === data.community.type).image}
                                    className={style.typeIcon}
                                    alt=""
                                />
                            </div>
                            <div className={style.descriptionDiv}>
                                {data.community.description}
                            </div>
                        </div>
                    </div>


                    <div className={style.rightDiv}>
                        <div className={style.owner}>
                            <UserInfo
                                image={getUserImage(data.ownerImage)}
                                nickname={data.ownerNickname}
                                flair={{title: "president", textColor: "#E3E3E3", color: "#15151D"}}
                            />
                        </div>
                        <div className={style.members}>
                            members (666)
                        </div>
                        <div className={style.joinLeaveDiv}>
                            <MyOutlineButton>
                                Join
                            </MyOutlineButton>
                        </div>
                    </div>


                </InfoDiv>
            </OutlineDiv>


        </div>
        : <MySyncLoader />
    );
}

export default CommunityPage;