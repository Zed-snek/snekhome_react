import React from 'react';
import {Outlet, Navigate} from "react-router-dom";

function UnauthorizedOnlyRoute({auth}) {
    return auth ? <Outlet/> : <Navigate to='/' />
}

export default UnauthorizedOnlyRoute;
