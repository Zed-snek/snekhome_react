import React, {useEffect, useState} from 'react';
import {AuthContext} from "./index";


function ContextAuth({children}) {

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [] )


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default ContextAuth;