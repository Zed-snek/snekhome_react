import React from 'react';
import style from "./HomePage.module.css";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import MyTextLink from "../../components/UI/links/MyTextLink";
import HomePageCards from "./HomePageCards";
import {useDocumentTitle} from "usehooks-ts";

function HomePage() {
    useDocumentTitle("Home")
    return (
        <div className={style.main}>

            <div className={style.postList}>
                <div className={style.createCommunityLinkDiv}>
                    <MyTextLink to="/new_community" className={style.createCommunityLink}>
                        Create Community
                    </MyTextLink>
                </div>
                <div className={style.content}>
                    <OutlineDiv>
                        Post
                    </OutlineDiv>
                </div>
            </div>
            <OutlineDiv className={style.cards}>
                <HomePageCards />
            </OutlineDiv>
        </div>
    );
}

export default HomePage;