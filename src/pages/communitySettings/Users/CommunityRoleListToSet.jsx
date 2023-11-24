import {Modal} from "react-bootstrap";
import {useGetRoles} from "../useGetRoles";
import style from "./CommunityRoleListToSet.module.css";
import managerStyle from "../../communitySettings/RoleManager/CommunityRoleManager.module.css";
import CommunityRoleItem from "../RoleManager/CommunityRoleItem";
import CommunityService from "../../../API/CommunityService";
import TransparentModal from "../../../components/UI/modal/TransparentModal";
import MyMessage from "../../../components/UI/message/MyMessage";
import {useMemo} from "react";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";

function CommunityRoleListToSet({nickname, setNickname, isModalVisible, setModalVisible, isCommunityClosed, setError, setIsLoader,
                                    groupname, communityType, setUsers}) {

    const [typesToMap, roles, setRoles]
        = useGetRoles(setError, setIsLoader, groupname, communityType, isCommunityClosed)

    async function setRole(role) {
        await CommunityService.setRole(nickname, groupname, role.title)
            .then(() =>
                setUsers(prev => {
                    let obj = {...prev}
                    obj.users[obj.users.findIndex(u => u.nickname === nickname)].communityRole = role
                    return obj
                })
            )
            .catch(err => setError(err.message))
        cleanData()
    }

    function cleanData() {
        setNickname('')
        setModalVisible(false)
    }

    const filteredRoles = useMemo(() => {
        return roles.filter(r => !r.creator && !r.citizen)
    }, [roles])

    return (
        <TransparentModal
            visible={isModalVisible}
            setVisible={() => cleanData()}
        >
            <Modal.Header>
                <h5>Choose role to set</h5>
            </Modal.Header>

            <Modal.Body>
                <div className={managerStyle.roleItems}>
                    { filteredRoles.length > 0
                        ? filteredRoles.map((role, index) =>
                            <BorderBottomDiv
                                key={index}
                                className={managerStyle.borderBottom}
                                onClick={() => setRole(role)}
                            >
                                <CommunityRoleItem
                                    className={style.item}
                                    role={role}
                                    groupname={groupname}
                                    typesToMap={typesToMap}
                                    setIsLoader={setIsLoader}
                                    setError={setError}
                                    setRoles={setRoles}
                                    isEdit={false}
                                />
                            </BorderBottomDiv>
                        )
                        : <MyMessage> No roles available to set </MyMessage>
                    }
                </div>
            </Modal.Body>
        </TransparentModal>
    );
}

export default CommunityRoleListToSet;