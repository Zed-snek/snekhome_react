import React, {useContext} from 'react';
import {AuthContext} from "../context";
import {Routes, Route} from "react-router-dom";
import InfoPage from "../../pages/InfoPage";
import PostList from "../../pages/PostList";
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


function AllRoutes() {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <MySyncLoader />
    }

    return (
        <Routes>

            {/*Private - only for authorized*/}
            <Route path='' element={<PrivateRoute auth={isAuth} />}>
                <Route path='/posts'>
                    <Route index element={<PostList />} />
                </Route>
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/newCommunity' element={<CreateCommunityPage />} />
            </Route>

            {/*Only for unauthorized*/}
            <Route path='' element={<UnauthorizedOnlyRoute auth={!isAuth} />}>
                <Route path='/message/:message' element={<InfoPage />}/>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/confirmation/:token' element={<VerifyPage />} />
            </Route>

            {/*Public*/}
            {/*<Route path='/c/:groupname' element={} />*/}
            <Route path='/u/:nickname' element={<UserPage />}/>
            <Route path='/resetMail/:token'
                   element={<ConfirmChangingEmailPage message="New list is sent on your new email to confirm it"/>}
            />
            <Route path='/newMail/:token'
                   element={<ConfirmChangingEmailPage message="logout"/>}
            />
            <Route path='/not_found' element={<NotFound />} />
            <Route path='/info' element={<InfoPage />} />
            <Route path='/*' element={<InfoPage />} />

        </Routes>
    );
}

export default AllRoutes;

