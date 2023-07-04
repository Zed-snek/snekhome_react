import React from 'react';

function ArrowRight({width, height, color}) {
    return (
        <svg width={width} height={height} viewBox="0 0 8 18" fill="none">
            <path d="M0 16.84L6.52 10.32C7.29 9.55 7.29 8.29 6.52 7.52L0 1"
                  stroke={color} strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>

    );
}

export default ArrowRight;