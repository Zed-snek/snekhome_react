import React from 'react';
import style from "./CommunitiesPage.module.css";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import CommunityCard from "./CommunityCard";

function CommunitiesPage() {
    return (
        <div>
            <OutlineDiv className={style.cards}>

                <CommunityCard>

                </CommunityCard>

            </OutlineDiv>
        </div>
    );
}

export default CommunitiesPage;