import {Modal} from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import {useGetRoles} from "../useGetRoles";
import style from "./CommunityRoleListToSet.module.css";
import CommunityRoleItem from "../RoleManager/CommunityRoleItem";
import CommunityService from "../../../API/CommunityService";

function CommunityRoleListToSet({visibleAndNickname, setVisibleAndNickname, isCommunityClosed, setError, setIsLoader,
                                    groupname, communityType, setUsers}) {

    const [typesToMap, roles, setRoles]
        = useGetRoles(setError, setIsLoader, groupname, communityType, isCommunityClosed)

    async function setRole(role) {
        await CommunityService.setRole(visibleAndNickname.nickname, groupname, role.title)
            .then(() =>
                setUsers(prev => {
                    let obj = {...prev}
                    obj.users[obj.users.findIndex(u => u.nickname === visibleAndNickname.nickname)].communityRole = role
                    return obj
                })
            )
            .catch(err => setError(err.message))
        setVisibleAndNickname({isShow: false, nickname: ''})
    }

    return (
        <Modal
            show={visibleAndNickname.isShow}
            onHide={() => setVisibleAndNickname({isShow: false, nickname: ''})}
            centered
        >
            <div className={"own_modal own_bg_colorHeader " + style.modal}>
                <Modal.Header className="bg-transparent">
                    <Modal.Title>Choose role to set</Modal.Title>
                    <CloseButton variant="white"
                                 className="shadow-none"
                                 onClick={() => setVisibleAndNickname({isShow: false, nickname: ''})}
                    />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        { roles.length > 0 ?
                            roles.filter(r => !r.creator && !r.citizen).map((role, index) =>
                                <div
                                    key={index}
                                    className={style.item}
                                    onClick={() => setRole(role)}
                                >
                                    <CommunityRoleItem
                                        role={role}
                                        groupname={groupname}
                                        typesToMap={typesToMap}
                                        setIsLoader={setIsLoader}
                                        setError={setError}
                                        setRoles={setRoles}
                                        isEdit={false}
                                    />
                                </div>
                            )
                        : <></> }
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default CommunityRoleListToSet;