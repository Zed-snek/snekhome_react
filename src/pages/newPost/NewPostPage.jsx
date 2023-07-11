import React, {useEffect} from 'react';
import style from "./NewPostPage.module.css";
import {useNavigate, useParams} from "react-router-dom";
import OutlineFilledDiv from "../../components/UI/blocks/OutlineFilledDiv";
import {useFetchCommunity} from "../communityPage/useFetchCommunity";

function NewPostPage() {
    const params = useParams()
    const navigate = useNavigate()

    const [data, setData, isCommunityLoading, communityError] = useFetchCommunity(params.groupname)

    useEffect(() => {
        if (data && !data.access)
            navigate("/c/" + params.groupname)
    }, [data])

    return (
        <div className={style.main}>
            <h3>
                New post in community <i>{params.groupname}</i>
            </h3>

            <OutlineFilledDiv className={style.form}>

            </OutlineFilledDiv>
        </div>
    );
}

export default NewPostPage;