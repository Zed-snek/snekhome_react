import style from "./CandidateItem.module.css";
import {getUserImage} from "../../../functions/linkFunctions";
import GreyLink from "../../../components/UI/links/GreyLink";
import DocumentPaperSvg from "../../../components/svg/DocumentPaperSvg";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import {useState} from "react";
import TransparentModal from "../../../components/UI/modal/TransparentModal";

function CandidateItem({nickname, title, image, program}) {

    const [isModal, setIsModal] = useState(false)

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

            <div className={style.programDiv}>
                <MyTransparentButton
                    tooltip={program}
                    className={style.programBtn}
                    onClick={() => setIsModal(true)}
                >
                    <div>
                        Program
                    </div>
                    <DocumentPaperSvg width={30} height={30}/>
                </MyTransparentButton>
            </div>

            <TransparentModal
                visible={isModal}
                setVisible={setIsModal}
                centered={true}
            >
                <p className={style.modalTitle}>
                    Candidate program of {title}
                </p>

                {program}
            </TransparentModal>
        </div>
    );
}

export default CandidateItem;