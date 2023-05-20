import React from 'react';
import {Outlet, Navigate} from "react-router-dom";

function PrivateRoute({auth}) {
    return auth ? <Outlet/> : <Navigate to='/message/unreachable' />
}

export default PrivateRoute;


