import {useSVG} from "../../../hooks/useSVG";

function UserRemoveSvg({width, height, color}) {
    const [w, h, c] = useSVG(34, 34, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.83081 31.1667C4.83081 25.6842 10.285 21.25 17 21.25C18.36 21.25 19.6775 21.4342 20.91 21.7742M17 17C18.8786 17 20.6803 16.2538 22.0086 14.9254C23.337 13.597 24.0833 11.7953 24.0833 9.91671C24.0833 8.03809 23.337 6.23642 22.0086 4.90803C20.6803 3.57965 18.8786 2.83337 17 2.83337C15.1214 2.83337 13.3197 3.57965 11.9913 4.90803C10.6629 6.23642 9.91664 8.03809 9.91664 9.91671C9.91664 11.7953 10.6629 13.597 11.9913 14.9254C13.3197 16.2538 15.1214 17 17 17Z"
                  stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path d="M26.9592 23.9984L23.97 26.9875M23.9983 24.0267L27.0017 27.0159M31.1667 25.5C31.1667 25.9534 31.11 26.3925 30.9967 26.8175C30.8692 27.3842 30.6425 27.9367 30.345 28.4184C29.8456 29.2577 29.1362 29.9526 28.2866 30.4345C27.4371 30.9164 26.4767 31.1687 25.5 31.1667C24.1052 31.1708 22.76 30.6499 21.7317 29.7075C21.3067 29.3392 20.9383 28.9 20.655 28.4184C20.1157 27.5406 19.8312 26.5302 19.8333 25.5C19.8324 24.7556 19.9783 24.0183 20.2628 23.3304C20.5472 22.6425 20.9646 22.0174 21.491 21.491C22.0174 20.9646 22.6424 20.5473 23.3304 20.2628C24.0183 19.9784 24.7556 19.8324 25.5 19.8334C27.1717 19.8334 28.6875 20.5559 29.7075 21.7175C30.6142 22.7234 31.1667 24.055 31.1667 25.5Z"
                  stroke={c} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
}

export default UserRemoveSvg;