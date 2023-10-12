import {useSVG} from "../../../hooks/useSVG";

function NotificationBoxSvg({width, height, color}) {
    const [w, h, c] = useSVG(36, 36, "#E3E3E3", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M34.8333 22V11C34.8333 6.94832 34.8333 3.66666 27.5 3.66666H16.5C9.16667 3.66666 9.16667 6.94832 9.16667 11V22M12.8333 22C5.5 22 5.5 25.2817 5.5 29.3333V31.1667C5.5 36.2267 5.5 40.3333 14.6667 40.3333H29.3333C36.6667 40.3333 38.5 36.2267 38.5 31.1667V29.3333C38.5 25.2817 38.5 22 31.1667 22C29.3333 22 28.82 22.385 27.8667 23.1L25.9967 25.08C25.4825 25.6268 24.8619 26.0626 24.173 26.3605C23.484 26.6584 22.7414 26.8121 21.9908 26.8121C21.2403 26.8121 20.4976 26.6584 19.8087 26.3605C19.1198 26.0626 18.4991 25.6268 17.985 25.08L16.1333 23.1C15.18 22.385 14.6667 22 12.8333 22Z"
                stroke={c} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
                d="M19.3416 16.9217H25.4466M17.8199 11.4217H26.9866"
                stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
}

export default NotificationBoxSvg;