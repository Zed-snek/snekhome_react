import style from "./CandidateItem.module.css";
import {getUserImage} from "../../../functions/linkFunctions";
import GreyLink from "../../../components/UI/links/GreyLink";
import DocumentPaperSvg from "../../../components/svg/DocumentPaperSvg";

function CandidateItem({nickname, title, image, program}) {

    return (
        <div className={style.main}>
            <div className={style.flex}>
                <div>
                    <img
                        src={getUserImage(image)}
                        className="userImage"
                        alt=""
                    />
                </div>

                <div>
                    <div className={style.title}>
                        {title}
                    </div>

                    <div>
                        <GreyLink to={"/u/" + nickname} className={style.link}>
                            @{nickname}
                        </GreyLink>
                    </div>
                </div>
            </div>

            <div className={style.program}>
                <div>
                    Program
                </div>
                <DocumentPaperSvg width={30} height={30}/>
            </div>
        </div>
    );
}

export default CandidateItem;