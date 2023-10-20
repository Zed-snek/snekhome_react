import OutlineFilledDiv from "../../../components/UI/blocks/OutlineFilledDiv";
import style from "./ModerationStatsOfPresident.module.css";

function ModerationStatsOfPresident({bannedCitizens, bannedUsers, deletedPosts}) {

    return (
        <OutlineFilledDiv className={style.main}>
            <div className={style.description}>
                Moderation statistic of current president:
            </div>

            <div className={style.presidentStats}>
                <div className={style.presidentStatsTitles}>
                    <div>
                        Banned citizens:
                    </div>
                    <div>
                        Banned users:
                    </div>
                    <div>
                        Deleted posts:
                    </div>
                </div>

                <div>
                    <div>
                        {bannedCitizens}
                    </div>
                    <div>
                        {bannedUsers}
                    </div>
                    <div>
                        {deletedPosts}
                    </div>
                </div>
            </div>
        </OutlineFilledDiv>
    );
}

export default ModerationStatsOfPresident;