import React from 'react';

function BooleanBlock({bool, children, ifFalse}) {
    return (
        <div>
            { bool
                ? children
                : ifFalse
            }
        </div>
    );
}

export default BooleanBlock;