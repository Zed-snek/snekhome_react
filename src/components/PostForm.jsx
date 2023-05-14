import React, {useState} from 'react';
import MyButton from "./UI/buttons/MyButton";
import MyInputOld from "./UI/inputs/MyInputOld";

function PostForm(props) {
    const [comment, setComment] = useState({name: '', text: ''})


    function addCommentary(e){
        e.preventDefault()

        const newComment = {
            ...comment, id: Date.now()
        }

        props.create(newComment)

        setComment({name: '', text: ''})
    }

    return (
        <form>
            <MyInputOld
                value={comment.name}
                placeholder="Имя"
                onChange={event => setComment({...comment, name: event.target.value } )}
            />

            <MyInputOld
                value={comment.text}
                placeholder="Комментарий"
                onChange={event => setComment( {...comment, text: event.target.value })}
            />

            <MyButton onClick={addCommentary}>Добавить комментарий</MyButton>
        </form>

    );
}

export default PostForm;