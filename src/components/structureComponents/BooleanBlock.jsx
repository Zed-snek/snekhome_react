import React from 'react';

function BooleanBlock({bool, children, ifFalse, ...props}) {
    return (
        <div {...props}>
            { bool
                ? children
                : ifFalse
            }
        </div>
    );
}

export default BooleanBlock;