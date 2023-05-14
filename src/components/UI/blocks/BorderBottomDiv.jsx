import React from 'react';

function BorderBottomDiv({className, children, ...props}) {

    return (
        <div className={className} {...props} style={{borderBottom: '1px solid #939393'}}>
            {children}
        </div>
    );
}

export default BorderBottomDiv;