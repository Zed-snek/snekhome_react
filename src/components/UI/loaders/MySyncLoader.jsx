import React from 'react';
import {SyncLoader} from "react-spinners";

function MySyncLoader({loading}) {
    return (
        <SyncLoader
            loading={loading}
            color={'#ff1177'}
            size={15}
            speedMultiplier={0.7}
        />
    );
}

export default MySyncLoader;