import React, {useState} from 'react';
import style from "./ChooseCommunity.module.css";
import ChooseCommunityItem from "./ChooseCommunityItem";

function ChooseCommunityPage() {

    const [chosen, setChosen] = useState(-1)

    return (
        <div className={style.main}>

            <div className={style.cards}> {/*color, title, description=children, image, id*/}
                <ChooseCommunityItem
                    id={0}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.blue}
                >
                </ChooseCommunityItem>

                <ChooseCommunityItem
                    id={1}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.red}
                >

                </ChooseCommunityItem>

                <ChooseCommunityItem
                    id={2}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.green}
                >

                </ChooseCommunityItem>

                <ChooseCommunityItem
                    id={3}
                    chosen={chosen}
                    setChosen={setChosen}
                    color={style.purple}
                >

                </ChooseCommunityItem>
            </div>

        </div>
    );
}

export default ChooseCommunityPage;