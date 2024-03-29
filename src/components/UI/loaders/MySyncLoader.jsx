import {SyncLoader} from "react-spinners";

function MySyncLoader({loading, ...props}) {
    return (
        <SyncLoader
            loading={loading}
            color={'#ff1177'}
            size={15}
            speedMultiplier={0.6}
            {...props}
        />
    );
}

export default MySyncLoader;