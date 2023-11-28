import {useState, useEffect, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import style from './UserPage.module.css';
import OutlineDiv from "../../components/UI/blocks/OutlineDiv";
import InfoDiv from "../../components/UI/blocks/InfoDiv";
import OverImageDiv from "../../components/UI/blocks/OverImageDiv";
import UserService from "../../API/UserService";
import {getUserImageByArray} from "../../utils/linkFunctions";
import InfoTag from "./InfoTag";
import {useFetching} from "../../hooks/useFetching";
import MySyncLoader from "../../components/UI/loaders/MySyncLoader";
import {useDocumentTitle} from "usehooks-ts";
import UserNicknameButtons from "./UserNicknameButtons";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import MyBlurredButton from "../../components/UI/buttons/MyBlurredButton";
import ImageSelectorModal from "../../components/imageComponents/ImageSelectorModal";
import {useIsCurrentUser} from "../../hooks/useIsCurrentUser";
import {UserContext} from "../../components/context";
import PostList from "../../components/post/PostList";

function UserPage() {

    const params = useParams()
    const {setUserImage} = useContext(UserContext)

    const [user, setUser] = useState()
    useDocumentTitle(params.nickname)

    const isCurrentUser = useIsCurrentUser(params.nickname)

    const [isImageModal, setIsImageModal] = useState(false)

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        const data = await UserService.userInfo(params.nickname)
        setUser(data)
    })
    useNotFoundNavigate(userError)

    useEffect(() => {
        fetchUser()
    }, [params.nickname])


    function setFriendshipType(type) {
        setUser(prev => ({...prev, friendshipType: type}))
    }

    return (
        <div>
            <MySyncLoader loading={isUserLoading || !user} />

            { user ?
            <div className={style.widthLimit}>
                <OutlineDiv className={style.userBanner}>
                    <div className={style.imageDiv}>
                        <OverImageDiv className={style.overImage} style={{color: user.nicknameColor}}
                                      sizeByLength={true}>
                            {user.nickname}
                        </OverImageDiv>
                        <img alt=""
                            src={getUserImageByArray(user.images)}
                            className={"bigUserImage " + style.userImage}
                        />
                        <div className={style.seeOtherImages}>
                            <MyBlurredButton
                                className={style.seeOtherImagesBtn}
                                onClick={() => setIsImageModal(true)}
                            >
                                see more...
                            </MyBlurredButton>
                            {
                                isImageModal ?
                                    <ImageSelectorModal
                                        visible={isImageModal}
                                        setVisible={setIsImageModal}
                                        format="user"
                                        isDeletePermission={isCurrentUser}
                                        array={user.images}
                                        setArray={newArray => {
                                            setUser(prev => ({...prev, images: newArray}))
                                            setUserImage(getUserImageByArray(newArray))
                                        }}
                                    />
                                    : <></>
                            }
                        </div>
                    </div>

                    <div className={style.userInfoDiv}>

                        <InfoDiv className={style.nicknameDiv}>
                            <div className={style.name}>
                                <div className={style.nickname}>
                                    {user.name + " " + user.surname}
                                </div>
                            </div>

                            <UserNicknameButtons
                                friendshipType={user.friendshipType}
                                setFriendshipType={setFriendshipType}
                            />

                        </InfoDiv>

                        <InfoDiv>

                            <div className={style.communitiesFriendsDiv}>
                                <Link to={"/communities/" + user.nickname} className={style.friendsBtn}>
                                    <div>joined communities ({user.communities})</div>
                                </Link>
                                <Link to={"/friends/" + user.nickname} className={style.friendsBtn}>
                                    <div>friends ({user.friends})</div>
                                </Link>
                            </div>

                            <div className={style.tagsDiv}>
                                <h5>About</h5>

                                <div className={style.tagsMap}>
                                    {user.tags.map(tag =>
                                        <InfoTag
                                            key={tag.idTag}
                                            title={tag.title}
                                            text={tag.text}
                                        />
                                    )}
                                </div>

                            </div>

                        </InfoDiv>
                    </div>
                </OutlineDiv>
            </div>
            : <></> }

            <div className={style.postList}>
                { isUserLoading ? <></> :
                    <PostList
                        loadType="USER"
                        entityName={params.nickname}
                    />
                }
            </div>
        </div>
    );
}

export default UserPage;