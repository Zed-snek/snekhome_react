import {useSVG} from "../../../hooks/useSVG";

function ArrowRight({width, height, color}) {

    const [w, h, c] = useSVG( 16, 32, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16.84L6.52 10.32C7.29 9.55 7.29 8.29 6.52 7.52L0 1"
                  stroke={c} strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>

    );
}

export default ArrowRight;