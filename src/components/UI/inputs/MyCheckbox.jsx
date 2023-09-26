import style from "./MyCheckbox.module.css"

function MyCheckbox({label, ...props}) {

    return (
        <label className={style.label}>
            <div className={style.mainDiv}>
                <input
                    className={style.main}
                    type="checkbox"
                    {...props}
                />
                <div>
                    {label}
                </div>
            </div>
        </label>
    );
}

export default MyCheckbox;