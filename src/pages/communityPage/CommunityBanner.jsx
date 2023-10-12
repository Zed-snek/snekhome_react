import {useState, useEffect} from 'react';
import style from "./CommunityPage.module.css";
import {getCommunityImageByArray, getUserImage} from "../../functions/linkFunctions";
import ImageSelectorModal from "../../components/images/ImageSelectorModal";
import UserInfo from "../../components/post/postCreatorInfo/UserInfo";
import {useNavigate} from "react-router-dom";
import MyTransparentButton from "../../components/UI/buttons/MyTransparentButton";
import MyOutlineButton from "../../components/UI/buttons/MyOutlineButton";
import MyPulseLoader from "../../components/UI/loaders/MyPulseLoader";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import {formatDateWithMonthName} from "../../functions/timeDateFunctions";
import GreyLink from "../../components/UI/links/GreyLink";
import CommunityLogsModal from "./communityLogs/CommunityLogsModal";
import SettingsSvg from "../../components/svg/user/SettingsSvg";

function CommunityBanner({data, setData, groupname, setError, groupnameColor, typeImage}) {

    const navigate = useNavigate()
    const [isImageModal, setIsImageModal] = useState(false)
    const [isLogsOpen, setIsLogsOpen] = useState(false)

    const communityType = data.community.type
    const role = data.currentUserRole

    const [fetchMembership, isMembershipLoading, membershipError] = useFetching(async () => {
        let n
        if (data.member) {
            await CommunityService.leaveCommunity(groupname)
            n = -1
        }
        else {
            await CommunityService.joinCommunity(groupname)
            n = 1
        }
        setData(prev => ({...prev, member: !prev.member, members: prev.members + n}))
    })

    function handleJoinLeaveBtn() {
        fetchMembership()
    }

    useEffect(() => {
        if (membershipError)
            setError(membershipError)
    }, [membershipError])

    useEffect(() => {
        if (data.community.images.length === 0 && isImageModal)
            setIsImageModal(false)
    }, [data.community.images])

    return (
        <OutlineFilledDiv className={style.bannerDiv}>

            <div className={style.leftDiv}>
                <div className={style.imageDateDiv}>
                    <div className={style.imgDiv}>
                        <img
                            src={getCommunityImageByArray(data.community.images)}
                            onClick={data.community.images.length === 0 ? () => {} : () => setIsImageModal(true)}
                            alt=""
                        />
                        <ImageSelectorModal
                            visible={isImageModal}
                            setVisible={setIsImageModal}
                            format="community"
                            isDeletePermission={role?.editDescription || role?.creator}
                            array={data.community.images}
                            setArray={newArray => setData(prev => (
                                {...prev, community: {...prev.community, images: newArray}}
                            ))}
                        />
                    </div>
                    <div className={style.groupname}>
                        @{data.community.groupname}
                    </div>
                    <div className={style.date}>
                        created {formatDateWithMonthName(data.community.creation)}
                    </div>
                </div>

                <div>
                    <div className={style.titleDiv}>
                            <span style={{color: groupnameColor}}>
                                {data.community.name}
                            </span>
                        <img
                            src={typeImage}
                            className={style.typeIcon}
                            alt=""
                        />
                    </div>
                    <div className={style.descriptionDiv}>
                        {data.community.description}
                    </div>
                </div>
            </div>


            <div className={style.rightDiv}>

                <div className={style.owner}>
                    <UserInfo
                        image={getUserImage(data.ownerImage)}
                        nickname={data.ownerNickname}
                        flair={data.community.roles
                            .filter(role => role.creator)
                            .map(r => (
                                {title: r.title, textColor: r.textColor, bannerColor: r.bannerColor}
                            ))[0]}
                    />
                </div>

                { (role?.inviteUsers || communityType === "ANARCHY") && data.joinRequests > 0 ?
                    <GreyLink to={'/join_requests/' + groupname}>
                        join requests ({data.joinRequests})
                    </GreyLink>
                : <></> }

                <GreyLink to={'/members/' + groupname} className={style.members}>
                    members ({data.members})
                </GreyLink>


                <div className={style.buttonsDiv}>
                    { communityType === "DEMOCRACY" || (communityType !== "ANARCHY" && role) ?
                        <MyTransparentButton
                            className={style.logsBtn}
                            tooltip="Open logs"
                            onClick={() => setIsLogsOpen(true)}
                        >
                            Logs
                        </MyTransparentButton>
                    : <></> }

                    { role?.editDescription || role?.creator || role?.editId || role ?
                        <MyTransparentButton
                            className={style.settingsBtn}
                            tooltip="Settings Page"
                            onClick={() => navigate('/community_settings/' + groupname)}
                        >
                            <SettingsSvg />
                        </MyTransparentButton>
                    : <></> }

                    <MyOutlineButton
                        className={style.joinLeaveBtn}
                        onClick={handleJoinLeaveBtn}
                    >
                        { isMembershipLoading
                            ? <MyPulseLoader />
                            : data.member ? "Leave" : "Join"
                        }
                    </MyOutlineButton>
                </div>
            </div>

            { isLogsOpen ?
                <CommunityLogsModal
                    setIsOpen={setIsLogsOpen}
                    groupname={groupname}
                />
            : <></> }

        </OutlineFilledDiv>
    );
}

export default CommunityBanner;