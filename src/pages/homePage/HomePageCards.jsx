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

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div>
            <MySyncLoader loading={isCardsLoading}/>
            <BooleanBlock bool={!isCardsLoading && data.length === 0}>
                You haven't joined to any communities yet
            </BooleanBlock>
            <div>
                {
                    data.map((card, index) =>
                        <div key={index} className={style.cardItem} onClick={() => navigate("/c/" + card.groupname)}>
                            <OverImageDiv className={style.cardItemOverImageDiv}>
                                @{card.groupname}
                            </OverImageDiv>
                            <img src={getCommunityImage(card.image)}/>
                        </div>
                    )
                }
            </div>

            <Nav.Link as={Link} to={"/communities"} className={style.otherCommunitiesLink}>
                Other
            </Nav.Link>
        </div>
    );
}

export default HomePageCards;