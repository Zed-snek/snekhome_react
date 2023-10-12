import {useSVG} from "../../../hooks/useSVG";

function LogoutSvg({width, height, color}) {
    const [w, h, c] = useSVG(34, 34, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.7067 20.7117L28.3333 17.085L24.7067 13.4584M13.8267 17.085H28.2342M16.66 28.3334C10.3983 28.3334 5.32666 24.0834 5.32666 17C5.32666 9.91669 10.3983 5.66669 16.66 5.66669"
                stroke={c} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
}

export default LogoutSvg;