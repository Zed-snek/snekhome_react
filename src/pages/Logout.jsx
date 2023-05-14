import React, {useContext} from 'react';
import {AuthContext} from "../components/Context";

function Logout() {

    const {logout} = useContext(AuthContext)

    return logout()
}

export default Logout;