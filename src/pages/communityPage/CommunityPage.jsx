import {useEffect, useState, useContext, useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import style from "./CommunityPage.module.css";
import anarchyImage from "../../images/communityTypes/anarchy.png";
import corporateImage from "../../images/communityTypes/corporate.png";
import demImage from "../../images/communityTypes/democracy.png";
import newsImage from "../../images/communityTypes/news.png";
import {getCommunityImage} from "../../functions/linkFunctions";
import MessageModal from "../../components/UI/modal/MessageModal";
import {useDocumentTitle} from "usehooks-ts";
import ClosedCommunityPage from "./ClosedCommunityPage";
import CommunityBanner from "./CommunityBanner";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import MyTextArea from "../../components/UI/inputs/MyTextArea";
import SortOutlineButtons from "../../components/UI/navigation/SortOutlineButtons";
import {toOnlyFirstLetterUpperCase} from "../../functions/stringFunctions";
import CommunityTypeBlock from "./CommunityTypeBlock";
import {useFetchCommunity} from "../../hooks/useFetchCommunity";
import {AuthContext} from "../../components/context";
import PostList from "../../components/post/PostList";
import CommunityDemocracyBlock from "./democracyComponents/CommunityDemocracyBlock";
import ModerationStatsOfPresident from "./democracyComponents/ModerationStatsOfPresident";

function CommunityPage() {

    const params = useParams()
    const navigate = useNavigate()
    const {isAuth} = useContext(AuthContext)
    useDocumentTitle(params.groupname.toLowerCase())

    const [data, setData, isCommunityLoading] = useFetchCommunity(params.groupname)

    const [error, setError] = useState("")
    const [isModalError, setModalError] = useState(false)

    const [activeSortBtn, setActiveSortBtn] = useState(0)

    useEffect(() => {
        if (error)
            setModalError(true)
    }, [error])


    const communityTypes = [
        {type: "ANARCHY", image: anarchyImage, color: '#ff1177'},
        {type: "CORPORATE", image: corporateImage, color: '#228dff'},
        {type: "DEMOCRACY", image: demImage, color: '#85b50e'},
        {type: "NEWSPAPER", image: newsImage, color: '#ff9900'},
    ]
    const [presidencyStats, setPresidencyStats] = useState() //for Democracy purpose only

    const {communityType, groupnameColor, typeImage} = useMemo(() => {
        let foundType = ""
        let color = ""
        let image = ""
        if (data) {
            foundType = data.community ? data.community.type : data.type
            const obj = communityTypes.find(type => type.type === foundType)
            color = obj.color
            image = obj.image
        }
        return {
            communityType: foundType,
            groupnameColor: color,
            typeImage: image
        }
    }, [data])


    if (data)
        if (!data.access)
            return (
                <ClosedCommunityPage
                    image={getCommunityImage(data.image)}
                    groupname={data.groupname}
                    name={data.name}
                    nameColor={groupnameColor}
                    typeImage={typeImage}
                    isRequestSent={data.requestSent}
                    isBanned={data.banned}
                />
            );
        else
            return (
        <div>
            <MessageModal visible={isModalError} setVisible={setModalError}>
                {error}
            </MessageModal>

            <CommunityBanner
                    data={data}
                    setData={setData}
                    groupnameColor={groupnameColor}
                    typeImage={typeImage}
                    groupname={params.groupname}
                    setError={setError}
            />

            <div className={style.page}>

                <div className={style.content}>
                    { communityType === "DEMOCRACY" ?
                        <CommunityDemocracyBlock
                            citizenDays={data.community.citizenParameters.days}
                            citizenRating={data.community.citizenParameters.rating}
                            isMember={data.member}
                            groupname={params.groupname}
                            setPresidencyStats={setPresidencyStats}
                        />
                    : <></> }

                    <OutlineFilledDiv className={style.newPostAndSortBanner}>
                        <div className={style.newPostDiv}>
                            { isAuth ?
                                <MyTextArea
                                    onClick={() => navigate("/new_post/" + params.groupname)}
                                    placeholder="New post..."
                                    className={style.newPostTextArea}
                                >
                                </MyTextArea>
                            : <></> }
                        </div>

                        <div className={style.sortButtons}>
                            <SortOutlineButtons
                                buttons={["Hot", "New"]}
                                activeBtn={activeSortBtn}
                                setActiveBtn={setActiveSortBtn}
                            />
                        </div>
                    </OutlineFilledDiv>

                    <PostList
                        loadType="COMMUNITY"
                        entityName={params.groupname}
                        isDeletePermission={data.currentUserRole?.deletePosts}
                    />

                </div>

                <div className={style.additionalInfoBlock}>
                    <CommunityTypeBlock
                        image={typeImage}
                        title={toOnlyFirstLetterUpperCase(data.community.type)}
                        color={groupnameColor}
                        isClosed={data.community.closed}
                        isAnonymous={data.community.anonAllowed}
                    />

                    { presidencyStats ?
                        <ModerationStatsOfPresident
                            deletedPosts={presidencyStats.deletedPosts}
                            bannedCitizens={presidencyStats.bannedCitizens}
                            bannedUsers={presidencyStats.bannedUsers}
                        />
                    : <></> }
                </div>



            </div>

        </div>
        );
    else /*if content is loading*/
        return <MySyncLoader />
}

export default CommunityPage;