import React, {useState} from 'react';
import style from "./ChooseCommunity.module.css";
import ChooseCommunityItem from "./ChooseCommunityItem";
import anarchyImage from "../../../images/communityTypes/anarchy.png";
import corporateImage from "../../../images/communityTypes/corporate.png";
import demImage from "../../../images/communityTypes/democracy.png";
import newsImage from "../../../images/communityTypes/news.png";

function ChooseCommunityPage({chosen, setChosen}) {

    return (
        <div className={style.main}>

            <div className={style.cards}> {/*color, title, description=children, image, id*/}
                <ChooseCommunityItem
                    id={0}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.blue}
                    image={corporateImage}
                    title="Corporate"
                >
                    You are the lord of your community and YOU can do anything you want with it.
                </ChooseCommunityItem>

                <ChooseCommunityItem
                    id={1}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.red}
                    image={anarchyImage}
                    title="Anarchy"
                >
                    Anyone can post, no one can ban or delete. You will be only possible to change description, image and name of community.
                </ChooseCommunityItem>

                <ChooseCommunityItem
                    id={2}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.green}
                    image={demImage}
                    title="Democracy"
                >
                    You will be the first president and then you possibly will be changed by elections, then you will lose all your power.
                </ChooseCommunityItem>

                <ChooseCommunityItem
                    id={3}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.orange}
                    image={newsImage}
                    title="Newspaper"
                >
                    Only you and moderators you choose will be possible to make the posts.
                </ChooseCommunityItem>
            </div>

        </div>
    );
}

export default ChooseCommunityPage;