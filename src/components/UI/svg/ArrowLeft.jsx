import React from 'react';

function ArrowLeft({width, height, color}) {
    return (
        <svg width={width} height={height} viewBox="0 0 9 18" fill="none">
            <path d="M8.0975 16.84L1.5775 10.32C0.8075 9.55 0.8075 8.29 1.5775 7.52L8.0975 1"
                  stroke={color} strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
}

export default ArrowLeft;