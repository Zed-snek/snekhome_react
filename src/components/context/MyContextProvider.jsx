import React from 'react';
import ContextAuth from "./ContextAuth";
import ContextUser from "./ContextUser";

function MyContextProvider({children}) {

    return (
        <ContextAuth>
            <ContextUser>
                {children}
            </ContextUser>
        </ContextAuth>
    );
}

export default MyContextProvider;

