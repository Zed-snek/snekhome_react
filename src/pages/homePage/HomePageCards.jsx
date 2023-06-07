import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import BooleanBlock from "../../components/UI/blocks/BooleanBlock";
import CommunityService from "../../API/CommunityService";
import style from "./HomePage.module.css";
import OverImageDiv from "../../components/UI/blocks/OverImageDiv";
import {getCommunityImage} from "../../functions/linkFunctions";
import Nav from "react-bootstrap/Nav";
import HomePageCardItem from "./HomePageCardItem";

function HomePageCards() {

    const navigate = useNavigate()

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
                        <HomePageCardItem
                            key={index}
                            title={card.groupname}
                            image={getCommunityImage(card.image)}
                            className={style.cardItemHover}
                            onClick={() => navigate("/c/" + card.groupname)}
                        />
                    )
                }
            </div>

            <BooleanBlock bool={!isCardsLoading && data.length > 0}>
                <Nav.Link
                    as={Link} to={"/communities"}
                    className={style.otherCommunitiesLink}
                >
                    Other
                </Nav.Link>
            </BooleanBlock>
        </div>
    );
}

export default HomePageCards;