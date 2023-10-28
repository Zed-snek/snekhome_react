import ListItemBlock from "../../components/UI/blocks/ListItemBlock";
import {getUserImage} from "../../utils/linkFunctions";
import CommunityRoleFlair from "../../components/community/CommunityRoleFlair";
import MyMessage from "../../components/UI/message/MyMessage";

function MembersItemListMap({array, buttonContent, onClickCallback, moreOptionsFunction = () => ""}) {
    return (
        <>
            { array.length > 0 ?
                array.map( (user, index) =>
                    <ListItemBlock
                        key={index}
                        image={getUserImage(user.image)}
                        title={user.name + ' ' + user.surname}
                        link={"/u/" + user.nickname}
                        idName={user.nickname}
                        buttonContent={buttonContent(user.communityRole)}
                        buttonClick={() => onClickCallback(user.nickname)}
                        rightCornerContent={moreOptionsFunction(user.communityRole, user.nickname)}
                        underIdContent={user.communityRole
                            ? <CommunityRoleFlair
                                title={user.communityRole.title}
                                bannerColor={user.communityRole.bannerColor}
                                textColor={user.communityRole.textColor}
                            />
                            : ''
                        }
                    />
                )
                : <MyMessage> Users not found </MyMessage>
            }
        </>
    );
}

export default MembersItemListMap;