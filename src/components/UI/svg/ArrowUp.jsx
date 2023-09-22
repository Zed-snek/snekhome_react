import {useSVG} from "../../../hooks/useSVG";

function ArrowUp({width, height, color}) {

    const [w, h, c] = useSVG(12, 15, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82922 1L1.16047 5.66875C0.822969 6.00625 1.04797 6.625 1.55422 6.625L4.14172 6.625L4.14172 13.9375C4.14172 14.275 4.36672 14.5 4.70422 14.5L6.95422 14.5C7.29172 14.5 7.51672 14.275 7.51672 13.9375L7.51672 6.625L10.1042 6.625C10.6105 6.625 10.8355 6.00625 10.498 5.66875L5.82922 1Z"
                  stroke={c} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default ArrowUp;