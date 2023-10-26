import style from "./HomePage.module.css";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import HomePageCards from "./HomePageCards";
import {useDocumentTitle} from "usehooks-ts";
import BoxedTextLink from "../../components/UI/links/BoxedTextLink";
import PostList from "../../components/post/PostList";

function HomePage() {
    useDocumentTitle("Home")

    return (
        <div className={style.main}>
            <div className={style.widthLimit}>

                <div className={style.content}>
                    <div className={style.createCommunityLinkDiv}>
                        <BoxedTextLink to="/new_community" className={style.createCommunityLink}>
                            Create Community
                        </BoxedTextLink>
                    </div>

                    <PostList loadType="HOME" />

                    <br/>
                </div>

                <div>
                    <OutlineDiv className={style.cards}>
                        <HomePageCards/>
                    </OutlineDiv>
                </div>

            </div>
        </div>
    );
}

export default HomePage;