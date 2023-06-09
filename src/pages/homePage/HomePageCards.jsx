import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import BooleanBlock from "../../components/UI/blocks/BooleanBlock";
import CommunityService from "../../API/CommunityService";
import style from "./HomePage.module.css";
import {getCommunityImage} from "../../functions/linkFunctions";
import HomePageCardItem from "./HomePageCardItem";
import {UserContext} from "../../components/context";

function HomePageCards() {

    const {userNickname} = useContext(UserContext)

    const [data, setData] = useState([])
    const [fetchCards, isCardsLoading, cardsError] = useFetching(async () => {
        let responseData = await CommunityService.getHomeCards()
        setData(responseData)
    })

    useEffect(() => {
        fetchCards()
    }, [])

    return (
        <div>
            <MySyncLoader loading={isCardsLoading}/>
            <BooleanBlock bool={!isCardsLoading && data.length === 0}>
                You haven't joined to any communities yet
            </BooleanBlock>
            <div>
                {
                    data.map((card, index) =>
                        <Link to={"/c/" + card.groupname} key={index}>
                            <HomePageCardItem
                                title={card.groupname}
                                image={getCommunityImage(card.image)}
                                className={style.cardItemHover}
                            />
                        </Link>
                    )
                }
            </div>

            <BooleanBlock bool={!isCardsLoading && data.length > 0}>
                <Link
                    to={"/communities/" + userNickname}
                    className={style.otherCommunitiesLink}
                >
                    <div className={style.otherCommunitiesDiv}>
                        Other
                    </div >
                </Link>
            </BooleanBlock>
        </div>
    );
}

export default HomePageCards;