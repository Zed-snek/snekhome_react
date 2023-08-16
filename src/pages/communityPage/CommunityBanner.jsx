import React, {useState, useEffect} from 'react';
import style from "./CommunityPage.module.css";
import {getCommunityImageByArray, getUserImage} from "../../functions/linkFunctions";
import ImageSelectorModal from "../../components/images/ImageSelectorModal";
import {formatCommunityCreationDate} from "../../functions/stringFunctions";
import UserInfo from "../../components/post/postCreatorInfo/UserInfo";
import {Link, useNavigate} from "react-router-dom";
import MyTransparentButton from "../../components/UI/buttons/MyTransparentButton";
import settingIco from "../../images/icons/settingIco.svg";
import MyOutlineButton from "../../components/UI/buttons/MyOutlineButton";
import MyPulseLoader from "../../components/UI/loaders/MyPulseLoader";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";


function CommunityBanner({data, setData, groupname, setError, groupnameColor, typeImage}) {

    const navigate = useNavigate()
    const [isImageModal, setIsImageModal] = useState(false)

    const [fetchMembership, isMembershipLoading, membershipError] = useFetching(async () => {
        let n
        if (data.member) {
            await CommunityService.leaveCommunity(data.community.groupname)
            n = -1
        }
        else {
            await CommunityService.joinCommunity(data.community.groupname)
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
                            isDeletePermission={data.currentUserRole && (data.currentUserRole.editDescription || data.currentUserRole.creator)}
                            array={data.community.images}
                            setArray={newArray => setData(prev => ({...prev, community: {...prev.community, images: newArray}}))}
                        />
                    </div>
                    <div className={style.groupname}>
                        @{data.community.groupname}
                    </div>
                    <div className={style.date}>
                        created {formatCommunityCreationDate(data.community.creation)}
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
                        flair={data.community.roles.filter(role => role.creator).map(r => (
                            {title: r.title, textColor: r.textColor, color: r.bannerColor}
                        ))[0]}
                    />
                </div>

                { ((data.currentUserRole && data.currentUserRole.inviteUsers) || data.community.type === "ANARCHY") && data.joinRequests > 0 ?
                    <Link to={'/join_requests/' + groupname} className={style.members}>
                        join requests ({data.joinRequests})
                    </Link>
                : <></> }

                <Link to={'/members/' + groupname} className={style.members}>
                    members ({data.members})
                </Link>


                <div className={style.buttonsDiv}>
                    {
                        data.currentUserRole && (data.currentUserRole.editDescription || data.currentUserRole.creator || data.currentUserRole.editId)
                            ?
                            <MyTransparentButton
                                className={style.settingsBtn}
                                tooltip="Settings Page"
                                onClick={() => navigate('/community_settings/' + data.community.groupname)}>
                                <img src={settingIco} alt="settings"/>
                            </MyTransparentButton>
                            : <></>
                    }
                    <MyOutlineButton
                        disabled={data.banned}
                        className={style.joinLeaveBtn}
                        onClick={handleJoinLeaveBtn}
                    >
                        { isMembershipLoading
                            ? <MyPulseLoader />
                            : data.banned
                                ? "Banned"
                                : data.member ? "Leave" : "Join"
                        }
                    </MyOutlineButton>
                </div>
            </div>

        </OutlineFilledDiv>
    );
}

export default CommunityBanner;