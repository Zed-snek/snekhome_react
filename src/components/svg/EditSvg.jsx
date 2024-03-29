import {useSVG} from "../../hooks/useSVG";

function EditSvg({width, height, color}) {

    const [w, h, c] = useSVG(21, 24, "#949494", width, height, color)

    return (
        <svg width={w} height={h} viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_276_63)">
                <path
                    d="M4.69753 12C4.87905 13.3409 5.44096 14.5741 6.29506 15.5062C7.14915 16.4384 8.24708 17.0165 9.41648 17.15M-3 28.95H12.5855"
                    stroke={c} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
                />
                <path
                    d="M11.4814 3.59997L4.37268 12.29C4.10426 12.62 3.8445 13.27 3.79255 13.72L3.47218 16.96C3.35962 18.13 4.08695 18.93 5.09135 18.73L7.87943 18.18C8.26907 18.1 8.81456 17.77 9.08298 17.43L16.1917 8.73997C17.4212 7.23997 17.9754 5.52997 16.0618 3.43997C14.1569 1.36997 12.7109 2.09997 11.4814 3.59997Z"
                    stroke={c} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}

export default EditSvg;