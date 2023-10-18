import {useContext} from 'react';
import {AuthContext} from "../context";
import {Routes, Route} from "react-router-dom";
import InfoPage from "../../pages/InfoPage";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "../../pages/registerPage/RegisterPage";
import UnauthorizedOnlyRoute from "./UnauthorizedOnlyRoute";
import VerifyPage from "../login/VerifyPage";
import UserPage from "../../pages/userPage/UserPage";
import NotFound from "../../pages/notFound/NotFound";
import SettingsPage from "../../pages/userSettings/SettingsPage";
import MySyncLoader from "../UI/loaders/MySyncLoader";
import ConfirmChangingEmailPage from "../../pages/userSettings/Security/ConfirmChangingEmailPage";
import Logout from "../../pages/Logout";
import CreateCommunityPage from "../../pages/createCommunity/CreateCommunityPage";
import CommunityPage from "../../pages/communityPage/CommunityPage";
import HomePage from "../../pages/homePage/HomePage";
import CommunityListPage from "../../pages/communityListPage/CommunityListPage";
import CommunitySettingsPage from "../../pages/communitySettings/CommunitySettingsPage";
import FriendsListPage from "../../pages/friendsList/FriendsListPage";
import MembersListPage from "../../pages/membersListPage/MembersListPage";
import NewPostPage from "../../pages/newPost/NewPostPage";
import PostPage from "../../pages/postPage/PostPage";
import EditPostPage from "../../pages/newPost/EditPostPage";
import JoinRequestsPage from "../../pages/joinRequests/JoinRequestsPage";


function AllRoutes() {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <MySyncLoader />
    }

    return (
        <Routes>

            {/*Private - only for authorized*/}
            <Route path='' element={<PrivateRoute auth={isAuth} />}>
                <Route index element={<HomePage />} />
                <Route path='/community_settings/:groupname' element={<CommunitySettingsPage />}/>
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/new_post/:groupname' element={<NewPostPage />} />
                <Route path='/post/:id/edit' element={<EditPostPage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/new_community' element={<CreateCommunityPage />} />
            </Route>
            {/*Private - only for authorized*/}


            {/*Only for unauthorized*/}
            <Route path='' element={<UnauthorizedOnlyRoute auth={!isAuth} />}>
                <Route path='/message/:message' element={<InfoPage />}/>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/confirmation/:token' element={<VerifyPage />} />
            </Route>
            {/*Only for unauthorized*/}


            {/*Public*/}
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/c/:groupname' element={<CommunityPage />} />
            <Route path='/u/:nickname' element={<UserPage />}/>
            <Route path='/communities/:nickname' element={<CommunityListPage />} />
            <Route path='/friends/:nickname' element={<FriendsListPage />} />
            <Route path='/members/:groupname' element={<MembersListPage />} />
            <Route path='/join_requests/:groupname' element={<JoinRequestsPage />} />
            <Route path='/not_found' element={<NotFound />} />
            <Route path='/info' element={<InfoPage />} />

            <Route path='/resetMail/:token'
                   element={<ConfirmChangingEmailPage message="New list is sent on your new email to confirm it"/>}
            />
            <Route path='/newMail/:token'
                   element={<ConfirmChangingEmailPage message="logout"/>}
            />

            <Route path='/*' element={<InfoPage />} />
            {/*Public*/}

        </Routes>
    );
}

export default AllRoutes;

