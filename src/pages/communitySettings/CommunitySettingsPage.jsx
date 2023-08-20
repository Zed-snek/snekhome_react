import React, {useState, useEffect} from 'react';
import style from "../userSettings/Settings.module.css";
import styleThis from "./CommunitySettingsPage.module.css";
import {useDocumentTitle} from "usehooks-ts";
import {useParams} from "react-router-dom";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import MyTextLink from "../../components/UI/links/MyTextLink";
import MessageModal from "../../components/UI/modal/MessageModal";
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import CommunitySettingsNavbar from "./CommunitySettingsNavbar";
import {useFetching} from "../../hooks/useFetching";
import CommunityService from "../../API/CommunityService";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import CommunityDetailsSettings from "./Details/CommunityDetailsSettings";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import CommunityRoleManager from "./RoleManager/CommunityRoleManager";
import CommunityDemocracySettingsPage from "./Democracy/CommunityDemocracySettingsPage";
import CommunityRulesSettings from "./Rules/CommunityRulesSettings";
import {getCommunityImageByArray} from "../../functions/linkFunctions";
import MembersListPage from "../membersListPage/MembersListPage";
import {useFetchCommunity} from "../../hooks/useFetchCommunity";

function CommunitySettingsPage() {

    useDocumentTitle("Settings")
    const params = useParams()

    const [data, setData, isCommunityLoading] = useFetchCommunity(params.groupname)

    const [isErrorModal, setIsErrorModal] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        setIsErrorModal(!!error)
    }, [error])

    const [isLoader, setIsLoader] = useState(false)
    useEffect(() => {
        setIsLoader(isCommunityLoading)
    }, [isCommunityLoading])


    const [page, setPage] = useState(1)
    function content() {
        switch (page) {
            case 1:
                return <CommunityDetailsSettings
                    setError={setError}
                    setIsLoader={setIsLoader}
                    groupname={data.community.groupname}
                    name={data.community.name}
                    description={data.community.description}
                    setData={setData}
                    image={getCommunityImageByArray(data.community.images)}
                />
            case 2:
                return <CommunityRoleManager
                    setError={setError}
                    setIsLoader={setIsLoader}
                    groupname={params.groupname}
                    communityType={data.community.type}
                    isCommunityClosed={data.community.closed}
                />
            case 4:
                return <CommunityRulesSettings
                    setError={setError}
                    setIsLoader={setIsLoader}
                    groupname={params.groupname}
                    communityType={data.community.type}
                    startSettings={{
                        anonAllowed: data.community.anonAllowed,
                        isClosed: data.community.closed,
                        inviteUsers: data.community.inviteUsers
                    }}
                    setStartSettings={(anon, closed, invite) =>
                        setData(prev => {
                            let obj = {...prev}
                            obj.community.anonAllowed = anon
                            obj.community.closed = closed
                            obj.community.inviteUsers = invite
                            return obj
                        })
                    }
                />
            case 5:
                return <CommunityDemocracySettingsPage
                    setError={setError}
                    setIsLoader={setIsLoader}
                    groupname={params.groupname}
                    startSettings={() => {
                        let obj = data.community.citizenParameters
                        return {citizenDays: obj.days, electionDays: obj.electionDays, citizenRating: obj.rating}
                    }}
                    setStartSettings={(citizen, election, rating) =>
                        setData(prev => {
                            let obj = {...prev}
                            obj.community.citizenParameters.days = citizen
                            obj.community.citizenParameters.electionDays = election
                            obj.community.citizenParameters.rating = rating
                            return obj
                        })
                    }
                />
        }
    }

    if (data)
    return (
        <div className={style.main}>

            <CommunitySettingsNavbar
                callback={setPage}
                currentUserRole={data.currentUserRole}
                communityType={data.community.type}
            />

            <div className={style.content}>
                <h2>
                    Settings
                    <div className={style.loader}>
                        <MySyncLoader loading={isLoader}/>
                    </div>
                </h2>
                <div className={style.link}>
                    { data ?
                        <MyTextLink to={"/c/" + data.community.groupname}>
                            Go back
                        </MyTextLink>
                        : <></>
                    }
                </div>

                <MessageModal
                    visible={isErrorModal}
                    setVisible={setIsErrorModal}
                >
                    {error}
                </MessageModal>

                { page === 3
                        ? <div className={style.membersListPage}>
                            <MembersListPage
                                permissions={data.currentUserRole}
                                communityType={data.community.type}
                                setError={setError}
                                setIsLoader={setIsLoader}
                                isCommunityClosed={data.community.closed}
                            />
                        </div>
                        : <OutlineDiv>
                            <InfoDiv className={styleThis.content}>
                                {content()}
                            </InfoDiv>
                        </OutlineDiv>
                }
                <br/>
            </div>
        </div>
    );
    else
        return <MySyncLoader />
}

export default CommunitySettingsPage;