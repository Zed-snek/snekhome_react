import React, {useState, useEffect} from 'react';
import style from './AboutUser.module.css';
import InfoDiv from "../../../components/UI/blocks/InfoDiv";
import AboutUserElement from "./AboutUserElement";
import MyTransparentButton from "../../../components/UI/buttons/MyTransparentButton";
import BorderBottomDiv from "../../../components/UI/blocks/BorderBottomDiv";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import MessageModal from "../../../components/UI/modal/MessageModal";


function AboutUserPage({tags, fetchUser, setError, setLoader, setUser}) {

    const [isForm, setIsForm] = useState(false)

    const [data, setData] = useState({
        title: '',
        text: ''
    })
    const [editId, setEditId] = useState(0)

    function manageData(title, text, id) { /*Add new tag to db*/
        setData({
            title: title,
            text: text
        })
        if (id !== undefined)
            setEditId(id)
        else
            setEditId(0)
    }

    function refresh() {
        fetchUser()
    }

    const [fetchNew, isNewLoading, newError] = useFetching(async () => {
        await UserService.newTag({
            title: data.title,
            text: data.text
        })
        refresh()
    })

    const [fetchEdit, isEditLoading, editError] = useFetching(async () => {
        await UserService.updateTag({
            id: editId,
            title: data.title,
            text: data.text
        })
        refresh()

    })

    useEffect(() => {
        if (data.text !== '' && data.title !== '') {
            if (editId === 0)
                fetchNew()

            else
                fetchEdit()
        }
    }, [data])

    const [delId, setDelId] = useState(0)
    useEffect(() => {
        if (delId !== 0)
            setDeleteModal(true)
    }, [delId])

    const [fetchDel, isDelLoading, delError] = useFetching(async () => {
        let responseData = await UserService.delTag(delId)
        if (responseData.status === 200)
            setUser(prev => ({...prev, tags: prev.tags.filter(tag => tag.idTag !== delId)}))

        setDeleteModal(false)
    })
    const [isDeleteModal, setDeleteModal] = useState(false)
    function deleteTag() {
        fetchDel()
    }

    useEffect(() => {
        if (newError)
            setError(newError)
        else if (delError)
            setError(delError)
        else if (editError)
            setError(editError)
    }, [newError, delError, editError])


    useEffect(() => {
        if (isNewLoading || isDelLoading || isEditLoading)
            setLoader(true)
        else
            setLoader(false)

    }, [isNewLoading, isDelLoading, isEditLoading])


    return (
        <InfoDiv>

            <MessageModal
                visible={isDeleteModal}
                setVisible={setDeleteModal}
                acceptCallback={deleteTag}
            > {/*Delete Modal*/}
                Are you sure you want to delete this information tag?
            </MessageModal>

            <div className={style.main}>
                <BorderBottomDiv>
                    <p>On this page you can add information tags about yourself. For example:</p>
                    <p>"My favourite films: Taxi Driver (1976), Drive (2011)"</p>
                </BorderBottomDiv>

                <BorderBottomDiv>
                { tags.map(tag =>
                    <AboutUserElement
                        key={tag.idTag}
                        tagId={tag.idTag}
                        tagTitle={tag.title}
                        tagText={tag.text}
                        manageData={manageData}
                        setDelId={setDelId}
                    />
                )}
                    <br/>
                </BorderBottomDiv>

                <div className={style.newTagDiv}>
                { isForm
                    ? <AboutUserElement
                        isForm={isForm}
                        setIsForm={setIsForm}
                        manageData={manageData}
                    />
                    : <div className={style.addButtonDiv}>
                        <MyTransparentButton className={style.addButton} onClick={() => setIsForm(true)}>
                            Add new information tag
                        </MyTransparentButton>
                    </div>
                }
                </div>

            </div>
        </InfoDiv>
    );
}

export default AboutUserPage;