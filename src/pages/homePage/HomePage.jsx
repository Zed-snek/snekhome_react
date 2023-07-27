import React from 'react';
import style from "./HomePage.module.css";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import HomePageCards from "./HomePageCards";
import {useDocumentTitle} from "usehooks-ts";
import MyBoxedTextLink from "../../components/UI/links/MyBoxedTextLink";

function HomePage() {
    useDocumentTitle("Home")
    return (
        <div className={style.main}>

            <div className={style.postList}>
                <div className={style.createCommunityLinkDiv}>
                    <MyBoxedTextLink to="/new_community" className={style.createCommunityLink}>
                        Create Community
                    </MyBoxedTextLink>
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