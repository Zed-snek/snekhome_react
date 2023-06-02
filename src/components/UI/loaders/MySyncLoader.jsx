import React from 'react';
import {SyncLoader} from "react-spinners";

function MySyncLoader({loading, ...props}) {
    return (
        <SyncLoader
            loading={loading}
            color={'#ff1177'}
            size={15}
            speedMultiplier={0.7}
            {...props}
        />
    );
}

export default MySyncLoader;