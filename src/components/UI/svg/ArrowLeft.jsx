import {useSVG} from "../../../hooks/useSVG";

function ArrowLeft({width, height, color}) {

    const [w, h, c] = useSVG( 16, 32, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.0975 16.84L1.5775 10.32C0.8075 9.55 0.8075 8.29 1.5775 7.52L8.0975 1"
                  stroke={c} strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
}

export default ArrowLeft;