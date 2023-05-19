import React from 'react';
import {useLogout} from "../hooks/useLogout";

function Logout() {

    const logout = useLogout()

    return logout()
}

export default Logout;