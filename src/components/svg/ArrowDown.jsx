import {useSVG} from "../../hooks/useSVG";

function ArrowDown({width, height, color}) {

    const [w, h, c] = useSVG( 12, 15, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.82932 14.5L10.4981 9.83125C10.8356 9.49375 10.6106 8.875 10.1043 8.875L7.51682 8.875L7.51682 1.5625C7.51682 1.225 7.29182 1 6.95432 1L4.70432 1C4.36682 1 4.14182 1.225 4.14182 1.5625L4.14182 8.875L1.55432 8.875C1.04807 8.875 0.823071 9.49375 1.16057 9.83125L5.82932 14.5Z"
                stroke={c} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default ArrowDown;