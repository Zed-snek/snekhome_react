import style from './OverImageDiv.module.css';
import {useClasses} from "../../../hooks/useClasses";

/*to work properly, parent's div must have position: relative; property*/
function OverImageDiv({children, className, sizeByLength, ...props}) {

    let classes = useClasses(style.main, className)

    if (sizeByLength) {
        if (children.length > 14)
            classes += " " + style.px16
        else
            classes += " " + style.px20
    }

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default OverImageDiv;