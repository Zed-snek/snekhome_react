import React from 'react';
import {PulseLoader} from "react-spinners";
import styles from "./spinners.module.css"

function MyPulseLoader({loading, ...props}) {
    return (
        <PulseLoader
            loading={loading}
            color={'#ff1177'}
            size={10}
            speedMultiplier={0.7}
            className={styles.pulseLoader}
            {...props}
        />
    );
}

export default MyPulseLoader;